import React from "react";
import dietOne from '../images/diets/diet1.jpeg';
/*import dietTwo from '../images/diets/diet2.jpeg';
import dietThree from '../images/diets/diet3.jpeg';
import dietFour from '../images/diets/diet4.jpeg';
import dietFive from '../images/diets/diet5.jpeg';
import dietSix from '../images/diets/diet6.jpeg';
import dietSeven from '../images/diets/diet7.jpeg';
import dietEight from '../images/diets/diet8.jpeg';
import dietNine from '../images/diets/diet9.jpeg';
import dietTen from '../images/diets/diet10.jpeg';*/
import './styles/Navbar.css'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 700,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function DietView({dietNumber}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            D
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Dieta 1"
        subheader="Subir peso"
      />
      <CardMedia
        className={classes.media}
        image={dietOne}
        title="Dieta 1"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Dieta descripcion
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>        
      </CardActions>
      
    </Card>
  );
}
