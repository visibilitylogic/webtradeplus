export const tradesMargin = (openTrades) =>
  openTrades.length > 0
    ? openTrades.reduce((sum, currentValue) => sum + currentValue.margin, 0)
    : 0;
