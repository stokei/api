export const getValueFromObjectOrString = (
  objOrString: any,
  key: string
): string => {
  if (!objOrString) {
    return;
  }
  if (typeof objOrString === 'object' && objOrString?.[key]) {
    return objOrString?.[key];
  }
  return objOrString + '';
};
