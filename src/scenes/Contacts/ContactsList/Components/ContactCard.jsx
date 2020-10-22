import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import useContacts from '../../../../context/ContactContext/ContactsContext';
import { 
  Card,
  CardActions,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button 
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const ContactCard = ({contact, action}) => {
  const classes = useStyles();
  const history = useHistory();
  const { deleteContact } = useContacts();

  const handleClick = () => {
    history.push(`/details/${contact.id}`);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          className={classes.media}
          image={contact.avatar}
          title={`${contact.first_name} ${contact.last_name}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {`${contact.first_name} ${contact.last_name}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {contact.email}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={action}>
          <EditIcon />
        </Button>
        <Button size="small" color="secondary" onClick={() => deleteContact(contact.id)}>
          <DeleteIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default ContactCard;