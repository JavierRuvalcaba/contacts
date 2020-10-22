import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import ContactsList from './ContactsList';

const useStyles = makeStyles({
  root: {
    paddingTop: '3%', 
    paddingBottom: '3%', 
  },
  header: {
    fontSize: '18px',
  },
  paper: {
    marginBottom: '20px',
    padding: '5px',
  }
})

const Contacts = () => {
  const classes = useStyles();

  return (
    <Container maxWidth='lg'  className={classes.root}>
      <ContactsList />
    </Container>
  );
};

export default Contacts;