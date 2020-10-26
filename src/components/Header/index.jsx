import React from 'react'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import LinearProgress from '@material-ui/core/LinearProgress';
import useContacts from '../../context/ContactContext/ContactsContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  header: {
    backgroundColor: '#488CB6'
  }
}))

const Header = () => {
  const { loading } = useContacts();
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.header}>
        <Toolbar>
          <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Contacts - ArkusNexus
          </Typography>
        </Toolbar>
        { loading ? <LinearProgress color='secondary' /> : null }
      </AppBar>
    </div>
  )
}

export default Header
