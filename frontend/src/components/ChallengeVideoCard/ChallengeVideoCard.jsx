import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography, IconButton, Divider, Paper } from '@material-ui/core/';
import Player from '../Player/Player';
import { connect } from 'react-redux';
import { fetchLikeAC } from '../../redux/action-creator';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
  },
  media: {
    objectFit: 'cover'
  },
  profileLink: {
    textDecoration: 'none'
  },
  like: {
    color: '#96031A'
  },
  hashtags: {
    marginTop: theme.spacing(1),
    color: 'blue',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  cardBtn: {
    backgroundColor: '#FAA916',
    '&:hover': {
      backgroundColor: '#96031A',
    },
  },
  cardBtnLink: {
    textDecoration: 'none',
    color: '#FBFFFE',
    '&:hover': {
      color: '#FAA916',
    }
  },
  likesBox: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const ChallengeCard = (props) => {
  const classes = useStyles();

  const handleLike = () => {
    if (!props.state.user.name) {
      return;
    } else {
      const userId = props.state.user._id;
      const challengeId = props.challenge._id;
      props.fetchLike(userId, challengeId);
    }
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar alt="avatar" src={props.challenge.user.avatar} aria-label="recipe" />}
        title={props.challenge.user.name}
        subheader={props.challenge.date}
      />
      <CardMedia className={classes.media}>
          <Player url={props.challenge.url} />
      </CardMedia>
      <CardContent>
        <Typography variant="h6" color="textSecondary" component="p">
          {props.challenge.original ? props.challenge.title : null}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.challenge.description}
        </Typography>
        <Typography className={classes.hashtags} variant="body2" color="textSecondary" component="p">
          {
            props.challenge.hashtags
              ? props.challenge.hashtags.join().replace(/[,]/g, ' ')
              : null
          }
        </Typography>
      </CardContent>
      <Divider light variant='middle' />
      <CardActions className={classes.cardActions}>
        <Box className={classes.likesBox}>
          <IconButton aria-label="add to favorites" onClick={handleLike}>
            <FavoriteIcon className={classes.like} />
          </IconButton>
          <Typography variant="body2" color="textSecondary" component="p">{props.challenge.likes.length}</Typography>
        </Box>
        <Paper>
          <Button className={classes.cardBtn} size="small"><Link className={classes.cardBtnLink} to={`/challenge/${props.challenge._id}`}>Open Challenge</Link></Button>
        </Paper>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state) => ({ state });
const mapDispatchToProps = (dispatch) => ({
  fetchLike: (id, userId) => dispatch(fetchLikeAC(id, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeCard);
