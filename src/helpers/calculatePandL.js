export const calculatePandL = (item, marketRate, leverage) => {
  if (item.tag === "sell") {
    if (item.openRateOfAsset < marketRate.price) {
      return -Math.abs(
        ((item.margin * marketRate) / item.openRateOfAsset) * leverage
      );
    } else if (item.openRateOfAsset > marketRate.price) {
      Math.abs(((item.margin * marketRate) / item.openRateOfAsset) * leverage);
    } else {
      return ((item.margin * marketRate) / item.openRateOfAsset) * leverage;
    }
  } else {
    return ((item.margin * marketRate) / item.openRateOfAsset) * leverage;
  }
};
