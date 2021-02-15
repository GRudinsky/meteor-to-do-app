const hideCompletedFilter = { isChecked: { $ne: true } };

const userFilter = user => user ? { userId: user._id } : {};

const pendingOnlyFilter = user => ({ ...hideCompletedFilter, ...userFilter(user) });

export {
  hideCompletedFilter,
  pendingOnlyFilter,
  userFilter
};