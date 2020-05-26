import React, { useState, Fragment } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Typography,
  Avatar,
  Drawer,
  List,
  ListItemText,
  Divider,
  ListItem,
  ListItemAvatar,
} from '@material-ui/core';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import avatarImage from '../../assets/van-damme.jpg';

const useStyles = makeStyles((theme) => ({
  listItem: {
    color: '#6D676E',
    '&:hover': {
      backgroundColor: '#96031A',
      color: '#FAA916',
    },
  },
  listTitle: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '20px',
    paddingBottom: '20px',
    fontWeight: 'bold',
    color: '#FAA916',
    backgroundColor: '#96031A',
  },
}));

const FollowingDrawer = (props) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userFollowings, setuserFollowings] = useState({ followings: [] });

  const handleDrawerOpen = async () => {
    const response = await fetch('/profile/populateFollowings', {
      method: 'GET',
    });
    const result = await response.json();
    setuserFollowings({
      ...userFollowings,
      followings: result,
    });
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const renderDrawer = (
    <Drawer anchor="left" open={openDrawer} onClose={handleDrawerClose}>
      <div onClick={handleDrawerClose}>
        <Typography className={classes.listTitle} variant="h6">
          Following
        </Typography>
        <Divider />
        <List>
          {
            userFollowings.followings.length
              ? userFollowings.followings.map(following => {
                return (
                  <ListItem button className={classes.listItem}>
                    <ListItemAvatar>
                      <Avatar src={following.avatar} />
                    </ListItemAvatar>
                    <ListItemText primary={following.name} />
                  </ListItem>
                )
              })
              : null
          }
        </List>
      </div>
    </Drawer>
  );

  return (
    <Fragment>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
      >
        <SubscriptionsIcon />
      </IconButton>
      {renderDrawer}
    </Fragment>
  )
}

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowingDrawer);
