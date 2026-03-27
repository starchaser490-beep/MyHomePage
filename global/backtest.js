// ============ 回测引擎 ============
function generateMonthlyReturns(strategyIdx, years) {
  const s = strategies[strategyIdx];
  const months = years * 12;
  const mMean = s.cagr / 100 / 12;
  const mVol = s.vol / 100 / Math.sqrt(12);
  const returns = [];
  let seed = strategyIdx * 1000 + years * 100 + 42;
  function rand() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  function randn() { return Math.sqrt(-2 * Math.log(rand())) * Math.cos(2 * Math.PI * rand()); }
  for (let i = 0; i < months; i++) {
    let r = mMean + mVol * randn() * 0.7;
    if (r < -Math.abs(s.maxdd) / 100 / 3) r = -Math.abs(s.maxdd) / 100 / 3 * (0.5 + rand() * 0.5);
    returns.push(r);
  }
  return returns;
}

function computeBacktest(strategyIdx, capital, years) {
  const mReturns = generateMonthlyReturns(strategyIdx, years);
  const months = mReturns.length;
  const nav = [capital];
  for (let i = 0; i < months; i++) nav.push(nav[nav.length - 1] * (1 + mReturns[i]));
  let peak = capital;
  const drawdowns = [0];
  for (let i = 1; i < nav.length; i++) {
    if (nav[i] > peak) peak = nav[i];
    drawdowns.push((nav[i] - peak) / peak * 100);
  }
  const finalVal = nav[nav.length - 1];
  const totalReturn = (finalVal / capital - 1) * 100;
  const cagr = (Math.pow(finalVal / capital, 1 / years) - 1) * 100;
  const maxDD = Math.min(...drawdowns);
  const avgM = mReturns.reduce((a, b) => a + b, 0) / months;
  const stdM = Math.sqrt(mReturns.reduce((a, b) => a + (b - avgM) ** 2, 0) / months);
  const sharpe = (avgM * 12 - 0.02) / (stdM * Math.sqrt(12));
  const negReturns = mReturns.filter(r => r < 0);
  const downDev = Math.sqrt(negReturns.reduce((a, b) => a + b * b, 0) / months);
  const sortino = (avgM * 12 - 0.02) / (downDev * Math.sqrt(12));
  const positiveMonths = mReturns.filter(r => r > 0).length;
  const bestMonth = Math.max(...mReturns) * 100;
  const worstMonth = Math.min(...mReturns) * 100;
  const startYear = 2026 - years;
  const labels = [];
  for (let i = 0; i <= months; i++) {
    const y = startYear + Math.floor(i / 12);
    const m = (i % 12) + 1;
    labels.push(y + '-' + String(m).padStart(2, '0'));
  }
  const yearlyReturns = [];
  for (let y = 0; y < years; y++) {
    yearlyReturns.push(((nav[(y + 1) * 12] / nav[y * 12]) - 1) * 100);
  }
  return { nav, drawdowns, labels, mReturns, yearlyReturns, startYear, finalVal, totalReturn, cagr, maxDD, sharpe, sortino, positiveMonths, months, bestMonth, worstMonth, vol: stdM * Math.sqrt(12) * 100 };
}
