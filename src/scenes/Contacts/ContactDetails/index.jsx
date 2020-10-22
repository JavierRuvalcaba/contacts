import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, Grid, Typography, Button } from '@material-ui/core';
import useContacts from '../../../context/ContactContext/ContactsContext';

const useStyles = makeStyles({
  paper: {
    margin: '10% auto',
    padding: '10px'
  },
  row: {
    padding: '5px',
    textAlign: 'left',
  },
  img: {
    width: '128px',
  }
})

const INITIAL_CONTACT = {
  avatar: '', first_name: '', last_name: '', email: ''
}

const ContactDetails = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { contacts } = useContacts();
  const [ contact, setContact ] = useState(INITIAL_CONTACT);
  
  useEffect(() => {
    const contactInfo = contacts.find(c => parseInt(c.id) === parseInt(props.match.params.id));
    const newContactInfo = contactInfo === undefined ? INITIAL_CONTACT : contactInfo;
    setContact(newContactInfo)
  }, [contacts, props.match.params.id])
  
  return (
    <Container maxWidth='sm'>
      <Paper elevation={3} className={classes.paper}>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <img src={contact.avatar} alt='img' className={classes.img} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography className={classes.row}>First Name: {contact.first_name}</Typography>
            <Typography className={classes.row}>Last Name: {contact.last_name}</Typography>
            <Typography className={classes.row}>E-mail: {contact.email}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Button
        variant='contained'
        color='default'
        disableElevation
        onClick={() => history.push('/')}
        className={classes.buttons}
      >
        Back
      </Button>
    </Container>
  );
};

export default ContactDetails;