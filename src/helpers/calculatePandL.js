export const calculatePandL = (item, marketRate, leverage) => {
  if (marketRate.price - item.openRateOfAsset === 0) {
    return 0;
  } else if (item.tag === "sell") {
    if (item.openRateOfAsset < marketRate.price) {
      return -Math.abs(
        ((item.margin * marketRate.price) / item.openRateOfAsset) * leverage
      );
    } else if (item.openRateOfAsset > marketRate.price) {
      Math.abs(
        ((item.margin * marketRate.price) / item.openRateOfAsset) * leverage
      );
    }
  } else {
    return ((item.margin * marketRate.price) / item.openRateOfAsset) * leverage;
  }
};
