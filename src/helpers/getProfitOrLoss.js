export const getProfitOrLoss = (
  activeTrade,
  currentSelectedStock,
  defaultSelectedStock
) =>
  Object.keys(activeTrade).length > 0
    ? Object.keys(currentSelectedStock).length > 0
      ? (currentSelectedStock.price - activeTrade.price).toString().slice(0, 8)
      : (defaultSelectedStock.price - activeTrade.price).toString().slice(0, 8)
    : 0;
