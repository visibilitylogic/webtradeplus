// export const getProfitOrLoss = (activeTrade, currentStock, defaultStock) => {
//   if (Object.keys(activeTrade).length > 0) {
//     if (activeTrade.tag === "sell") {
//       if (Object.keys(defaultStock).length > 0) {
//         if (activeTrade.price < defaultStock.price) {
//           return -Math.abs(defaultStock.price - activeTrade.price);
//         } else if (activeTrade.price > defaultStock.price) {
//           return Math.abs(defaultStock.price - activeTrade.price);
//         } else {
//           return defaultStock.price - activeTrade.price;
//         }
//       } else {
//         if (activeTrade.price < currentStock.price) {
//           return -Math.abs(currentStock.price - activeTrade.price);
//         } else if (activeTrade.price > currentStock.price) {
//           return Math.abs(currentStock.price - activeTrade.price);
//         } else {
//           return currentStock.price - activeTrade.price;
//         }
//       }
//     } else {
//       if (Object.keys(defaultStock).length > 0) {
//         return defaultStock.price - activeTrade.price;
//       } else {
//         return currentStock.price - activeTrade.price;
//       }
//     }
//   } else {
//     return 0;
//   }
// };

export const getPandL = (openTrades, assetRate) => {
  let profitLoss = 0;
  for (let i = 0; i < openTrades.length; i++) {
    for (let k = 0; k < assetRate.length; k++) {
      if (assetRate[k].symbol === openTrades[i].nameOfAsset) {
        if (openTrades[i].tag === "sell") {
          if (openTrades[i].openRateOfAsset < assetRate[k].price) {
            profitLoss += -Math.abs(
              assetRate[k].price - openTrades[i].openRateOfAsset
            );
          } else if (openTrades[i].openRateOfAsset > assetRate[k].price) {
            profitLoss += Math.abs(
              assetRate[k].price - openTrades[i].openRateOfAsset
            );
          } else {
            profitLoss += assetRate[k].price - openTrades[i].openRateOfAsset;
          }
        } else {
          profitLoss += assetRate[k].price - openTrades[i].openRateOfAsset;
        }
      }
    }
  }
  return profitLoss;
};
