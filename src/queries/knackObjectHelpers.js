export const getWorkTypeScheduledWorkOptions = options =>
  options.map(option => ({
    label: option,
    value: option,
  }));
