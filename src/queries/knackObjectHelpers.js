export const getWorkTypeScheduledWorkOptions = options =>
  options.map(option => ({
    label: option,
    value: option,
  }));

export const convertKnackResponseObjectToSelectFormOption = knackFieldObject => {
  return { value: knackFieldObject.id, label: knackFieldObject.identifier };
};

export const convertKnackResponseStringToSelectFormOption = knackFieldValue => {
  return { value: knackFieldValue, label: knackFieldValue };
};
