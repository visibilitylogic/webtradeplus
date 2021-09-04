export const tradesMargin = (openTrades) =>
  openTrades.length > 0
    ? openTrades.reduce((sum, currentVal) => sum + currentVal.margin, 0)
    : 0;
