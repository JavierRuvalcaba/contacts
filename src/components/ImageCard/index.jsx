import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia } from '@material-ui/core';
import IMG from './image-not-available.jpg';

const useStyles = makeStyles({
  large: {
    height: '250px',
    cursor: 'default',
    border: '2px solid #000',
  },
  small: {
    height: 140,
  },
});

const ImageCard = ({image, title, styleCard}) => {
  const classes = useStyles();

  const getImage = () => {
    if(image) return image;
    else return IMG;
  }
  
  return <CardMedia
    className={classes[styleCard]}
    image={getImage()}
    title={title}
  />
};

export default ImageCard;