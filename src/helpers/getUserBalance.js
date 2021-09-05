export const getUserBalance = (user, margin) =>
  user && user.wallet + user.bonus - margin;
