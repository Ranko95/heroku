import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  MenuItem,
  Menu,
  Avatar,
} from '@material-ui/core';
import { fetchLogOutAC } from '../../redux/action-creator';

const useStyles = makeStyles(() => ({
  profileLink: {
    textDecoration: 'none',
  },
}));

const NavBarMenu = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    props.fetchLogout();
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link className={classes.profileLink} to="/profile">
          My Profile
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose, handleLogout}>Log Out</MenuItem>
    </Menu>
  );

  return (
    <Fragment>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <Avatar alt="Challenger" src={props.state.user.avatar} />
      </IconButton>
      {renderMenu}
    </Fragment>
  )
}

const mapStateToProps = (state) => ({ state });
const mapDispatchToProps = (dispatch) => ({
  fetchLogout: () => dispatch(fetchLogOutAC())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBarMenu);
