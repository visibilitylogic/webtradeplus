export const getActiveTradeMargin = (activeTrade) =>
  Object.keys(activeTrade).length > 0 ? parseFloat(activeTrade.margin) : 0;
