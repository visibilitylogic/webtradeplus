export const getUserBalance = (user) => (user ? user.wallet + user.bonus : 0);
