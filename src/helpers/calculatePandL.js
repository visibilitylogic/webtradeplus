export const calculatePandL = (item, marketRate) => {
  if (item.tag === "sell") {
    if (item.openRateOfAsset < marketRate.price) {
      return -Math.abs(marketRate.price - item.openRateOfAsset);
    } else if (item.openRateOfAsset > marketRate.price) {
      return Math.abs(marketRate.price - item.openRateOfAsset);
    } else {
      return marketRate.price - item.openRateOfAsset;
    }
  } else {
    return marketRate.price - item.openRateOfAsset;
  }
};
