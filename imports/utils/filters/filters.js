const hideCompletedFilter = { isChecked: { $ne: true } },
  userFilter = user => user ? { userId: user._id } : {},
  pendingOnlyFilter = user => ({ ...hideCompletedFilter, ...userFilter(user) });

export {
  hideCompletedFilter,
  pendingOnlyFilter,
  userFilter
};