import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  TextField,
  Button
} from '@material-ui/core';
import useContacts from '../../../context/ContactContext/ContactsContext';
import { validate } from '../../../helpers/validator';
import ImageCard from '../../../components/ImageCard';
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
  const [ imagePreview, setImagePreview ] = useState(null);
  const [ disabled, setDisabled ] = useState(true);

  useEffect(() => {
    const image = contact ? contact.avatar : null;
    setImagePreview(image);
  }, [contact]);

  useEffect(() => {
    const formValid = form.first_name.valid && form.last_name.valid && form.email.valid && imagePreview !== null;
    setDisabled(!formValid);
  }, [form, imagePreview])
  
  const uploadImage = async (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    if (e.target.files.length === 0) {
      return;
    }
    setImagePreview(file)
    reader.onloadend = () => {
      setImagePreview([reader.result]);
    }
    reader.readAsDataURL(file);
  }

  const handleFormChange = async (e) => {
    const field = e.target.id;
    let value = e.target.value;
          
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
        onChange={field.type === 'file' ? uploadImage : handleFormChange}
        style={{ width: '100%', marginTop: '20px' }}
      />
    </Grid>
  ));

  const handleSave = () => {
    const newContactData = {
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      email: form.email.value,
      avatar: imagePreview,
    };

    if(contact) newContactData.id = contact.id;
    isNewContact ? addContact(newContactData) : editContact(contact.id, newContactData);
    close();
  }
  
  return (
    <Paper elevation={3} className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ImageCard image={imagePreview} title='Profile Picture' styleCard='large' />
        </Grid>
        {formInputs}
        <Grid item xs={12}>
          <Button
            variant='contained'
            color='primary'
            disableElevation
            onClick={handleSave}
            disabled={disabled}
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