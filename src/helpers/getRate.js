export const getRate = (
  defaultSelectedStock,
  currentSelectedStock,
  margin,
  leverage
) => {
  if (Object.keys(defaultSelectedStock).length > 0) {
    return ((margin / defaultSelectedStock.price) * leverage)
      .toString()
      .slice(0, 8);
  } else if (Object.keys(currentSelectedStock).length > 0) {
    return ((margin / currentSelectedStock.price) * leverage)
      .toString()
      .slice(0, 8);
  } else {
    return 0;
  }
};
