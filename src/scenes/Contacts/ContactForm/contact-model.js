export const getContactModel = (contact) => {
  return {
    first_name: {
      value: contact ? contact.first_name : '',
      label: 'First Name',
      valid: contact ? true : false,
      error: false,
      touched: false,
      msg: '',
      type: 'text',
      rules: {
        required: true,
        regex: /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/,
      }
    },
    last_name: {
      value:  contact ? contact.last_name : '',
      label: 'Last Name',
      valid: contact ? true : false,
      error: false,
      touched: false,
      msg: '',
      type: 'text',
      rules: {
        required: true,
        regex: /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/,
      }
    },
    email: {
      value:  contact ? contact.email : '',
      label: 'E-mail',
      valid: contact ? true : false,
      error: false,
      touched: false,
      msg: '',
      type: 'text',
      rules: {
        required: true,
        isEmail: true,
      }
    },
    avatar: {
      value:  '',
      label: 'Photo',
      valid: false,
      error: false,
      touched: false,
      type: 'file',
      msg: 'Select a valid image (.jpg, .png).',
      rule: {
        image: /^.*\.(jpg|gif|png|jpeg)$/,
      }
    }
  };
};