import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia,  Typography, IconButton } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 0,
    paddingTop: '100%', // '56.25%' - 16:9
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

}));

export default function ChallengeCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar alt="Van Damme" src={require("../../assets/van-damme.jpg")} aria-label="recipe" />}
        title="Jean-Claude Van Damme"
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image={require("../../assets/BottleCapChallenge.gif")}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Jason Stathem is Very Cool, but Jean-Claude Van Damme is Jean-Claude Van Damme! :) 
        </Typography>
      </CardContent>
      <Box mx='50px'><CardActions>
        
        <IconButton aria-label="add to favorites">
          <FavoriteIcon /> 
        </IconButton>
        <Typography variant="body2" color="textSecondary" component="p">1256</Typography>
       
        <Button size="small">Open Challenge</Button>
              
      </CardActions>
      </Box>
    </Card>
  );
}
