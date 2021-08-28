export const getRate = (
  defaultSelectedStock,
  currentSelectedStock,
  assetQuantity,
  leverage
) => {
  if (Object.keys(defaultSelectedStock).length > 0) {
    return (
      (assetQuantity / defaultSelectedStock.price) *
      (leverage && leverage)
    )
      .toString()
      .slice(0, 8);
  } else {
    return (
      (assetQuantity / currentSelectedStock.price) *
      (leverage && leverage)
    )
      .toString()
      .slice(0, 8);
  }
};
