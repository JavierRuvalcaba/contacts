import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  TextField,
  CardMedia,
  Button
} from '@material-ui/core';
import useContacts from '../../../context/ContactContext/ContactsContext';
import { validate } from '../../../helpers/validator';
import { getContactModel } from './contact-model';

const useStyles = makeStyles({
  root: {
    width: '40%',
    minWidth: '400px',
    padding: '30px',
  },
  media: {
    height: '250px',
    cursor: 'default',
    border: '2px solid #000',
  },
  buttons: {
    width: '100px',
    padding: '5px',
    margin: '5px',
    float: 'right',
  },
})

const ContactForm = ({contact, close, isNewContact}) => {
  const classes = useStyles();
  const { editContact, addContact } = useContacts();
  const [ form, setForm ] = useState(getContactModel(contact));
  
  const handleFormChange = (field, value) => {
    const newForm = {
      ...form,
    };
    const newInput = {
      ...newForm[field],
    };
    newInput.touched = true;
    newInput.value = value;
    newInput.valid = validate(value, newInput.rules);
    newForm[field] = newInput;

    setForm(newForm);
  };

  const formFields = [];
  for (const key in form) {
    const field = form[key];
    formFields.push({
      id: key,
      label: field.label,
      type: field.type,
      error: !field.valid && field.touched,
      value: field.value,
    });
  }
  const formInputs = formFields.map(field => (
    <Grid item xs={12} key={field.id}>
      <TextField
        {...field}
        onChange={(e) => { handleFormChange(field.id, e.target.value); }}
        onFocus={(e) => { handleFormChange(field.id, e.target.value); }}
        style={{ width: '100%', marginTop: '20px' }}
      />
    </Grid>
  ));

  const handleSave = () => {
    const newContactData = {
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      email: form.email.value,
      avatar: form.avatar.value,
    };

    if(contact) newContactData.id = contact.id;
    isNewContact ? addContact(newContactData) : editContact(contact.id, newContactData);
    close();
  }
  
  return (
    <Paper elevation={3} className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <CardMedia
              className={classes.media}
              image={form.avatar.value}
              title='photo'
            />
        </Grid>
        {formInputs}
        <Grid item xs={12} justify='flex-end'>
          <Button
            variant='contained'
            color='primary'
            disableElevation
            disabled={!(form.first_name.valid && form.last_name.valid && form.email.valid && form.avatar.valid)}
            onClick={handleSave}
            className={classes.buttons}
          >
            Save
          </Button>
          <Button
            variant='contained'
            color='default'
            disableElevation
            onClick={close}
            className={classes.buttons}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ContactForm;