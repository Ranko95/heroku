import React from 'react';
import ReactPlayer from 'react-player';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  player: {
    // position: 'absolute',
    // right: 0,
    // bottom: 0,
    // minWidth: '100%',
    // minHeight: '100%',
    // width: 'auto',
    // height: 'auto',
    // zIndex: '-100',
    // backgroundSize: 'cover',
    // overflow: 'hidden',
  }
}));


const Player = (props) => {
  const classes = useStyles();
  return (
    <ReactPlayer
      className={classes.player}
      url={props.url}
      controls
      width='100%'
      height='100%'
    />
  )
}

export default Player;
