import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useContacts from '../../../context/ContactContext/ContactsContext';
import ModalWindow from '../../../components/Modal' 
import ContactCard from './Components/ContactCard';
import ContactForm from '../ContactForm';

const useStyles = makeStyles({
  add: {
    width: '35px',
    height: '35px',
    color: 'blue',
    float: 'right',
    cursor: 'pointer',
  },
})

const ContactsList = () => {
  const classes = useStyles();
  const { contacts } = useContacts();
  const [ contactSelected, setContactSelected ] = useState(null);
  const [ open, setOpen ] = useState();
  
  const handleModalOpen = (contact) => {
    setContactSelected(open ? null : contact)
    setOpen(true);
  };

  const handleClose = () => {
    setContactSelected(null)
    setOpen(false);
  }
  
  const getContactCards = () => contacts.map(contact => (
    <Grid item xs={12} sm={6} md={3}>
      <ContactCard contact={contact} key={contact.id} action={() => handleModalOpen(contact)} />
    </Grid>
  ));
  
  return (
    <Grid container spacing={2} >
      {getContactCards()}
      <Grid item xs={12}>
        <AddCircleIcon className={classes.add} onClick={() => setOpen(true)} />
      </Grid>
      <ModalWindow
        component={<ContactForm contact={contactSelected} close={handleClose} isNewContact={contactSelected === null} />}
        open={open}
        handleClose={handleClose}
      />
    </Grid>
  );
};

export default ContactsList;