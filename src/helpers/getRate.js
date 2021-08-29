export const getRate = (
  defaultSelectedStock,
  currentSelectedStock,
  margin,
  leverage
) => {
  if (Object.keys(defaultSelectedStock).length > 0) {
    return ((margin / defaultSelectedStock.price) * (leverage && leverage))
      .toString()
      .slice(0, 8);
  } else {
    return ((margin / currentSelectedStock.price) * (leverage && leverage))
      .toString()
      .slice(0, 8);
  }
};
