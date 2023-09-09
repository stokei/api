export const getPagarmeError = (errors: any): undefined | Error => {
  if (!errors) {
    return;
  }
  if (typeof errors === 'string' || typeof errors === 'number') {
    return new Error(errors + '');
  }
  if (Array.isArray(errors)) {
    const newValue = errors?.[0];
    return getPagarmeError(newValue);
  }
  const errorList: string[] = Object.values(errors || {});
  if (errorList?.length) {
    const newValue = errorList?.[0];
    return getPagarmeError(newValue);
  }
  return;
};
