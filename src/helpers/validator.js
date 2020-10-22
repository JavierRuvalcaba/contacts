export const validate = (value, rules) => {
  let isValid = true;

  if (rules == null || rules === undefined) return isValid;

  if (rules.required) {
    if (rules.isNumber) {
      isValid = isValid && value > 0;
    } else {
      isValid = isValid && value.trim().length > 0;
    }
  }

  if (rules.maxLength) { isValid = isValid && value.trim().length <= rules.maxLength; }

  if (rules.minLength) { isValid = isValid && value.trim().length >= rules.minLength; }

  if (rules.isEmail) {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    isValid = isValid && pattern.test(value);
  }
  
  if (rules.regex) { isValid = isValid && rules.regex.test(value); }

  return isValid;
};
