export const getWorkTypeScheduledWorkOptions = knack => {
  if (knack === null || knack.objects === undefined) {
    return [];
  } else {
    return knack.objects.models
      .find(model => model.attributes.name === "work_orders_signals")
      .attributes.fields.find(
        field => field.name === "WORK_TYPE_SCHEDULED_WORK"
      )
      .format.options.map(option => ({
        label: option,
        value: option
      }));
  }
};
