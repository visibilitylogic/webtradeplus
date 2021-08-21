export const getRate = (
  defaultSelectedStock,
  currentSelectedStock,
  assetQuantity
) => {
  if (Object.keys(defaultSelectedStock).length > 0) {
    return ((assetQuantity / defaultSelectedStock.price) * 10)
      .toString()
      .slice(0, 8);
  } else {
    return ((assetQuantity / currentSelectedStock.price) * 10)
      .toString()
      .slice(0, 8);
  }
};
