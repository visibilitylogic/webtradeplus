// export const getProfitOrLoss = (
//   activeTrade,
//   currentSelectedStock,
//   defaultSelectedStock
// ) => {
//   if (Object.keys(activeTrade).length > 0) {
//     if (Object.keys(currentSelectedStock).length > 0) {
//       if (activeTrade.tag === "sell") {
//         if (activeTrade.price < currentSelectedStock.price) {
//           return -Math.abs(currentSelectedStock.price - activeTrade.price);
//         } else if (activeTrade.price > currentSelectedStock.price) {
//           return Math.abs(currentSelectedStock.price - activeTrade.price);
//         } else {
//           return currentSelectedStock.price - activeTrade.price;
//         }
//       }
//     } else if (Object.keys(defaultSelectedStock).length > 0) {
//       if (activeTrade.tag === "sell") {
//         if (activeTrade.price < currentSelectedStock.price) {
//           return -Math.abs(currentSelectedStock.price - activeTrade.price);
//         } else if (activeTrade.price > currentSelectedStock.price) {
//           return Math.abs(currentSelectedStock.price - activeTrade.price);
//         } else {
//           return currentSelectedStock.price - activeTrade.price;
//         }
//       }
//     }
//   } else {
//     return 0;
//   }
// };

export const getProfitOrLoss = (activeTrade, currentStock, defaultStock) => {
  if (Object.keys(activeTrade).length > 0) {
    if (activeTrade.tag === "sell") {
      if (Object.keys(defaultStock).length > 0) {
        if (activeTrade.price < defaultStock.price) {
          return -Math.abs(defaultStock.price - activeTrade.price);
        } else if (activeTrade.price > defaultStock.price) {
          return Math.abs(defaultStock.price - activeTrade.price);
        } else {
          return defaultStock.price - activeTrade.price;
        }
      } else {
        if (activeTrade.price < currentStock.price) {
          return -Math.abs(currentStock.price - activeTrade.price);
        } else if (activeTrade.price > currentStock.price) {
          return Math.abs(currentStock.price - activeTrade.price);
        } else {
          return currentStock.price - activeTrade.price;
        }
      }
    } else {
      if (Object.keys(defaultStock).length > 0) {
        return defaultStock.price - activeTrade.price;
      } else {
        return currentStock.price - activeTrade.price;
      }
    }
  } else {
    return 0;
  }
};
