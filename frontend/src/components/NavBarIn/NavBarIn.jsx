import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  InputBase,
  Button
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import logoImage from '../../assets/logo.png';
import UploadVideoBtn from '../../components/UploadVideoBtn/UploadVideoBtn';
import FollowingDrawer from '../../components/Drawer/Drawer';
import NavBarManu from '../../components/NavBarMenu/NavBarMenu';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    color: '#6D676E',
    backgroundColor: '#FBFFFE',
  },
  logoDiv: {
    textAligh: 'center',
    minWidth: '120px',
    minHeight: '50px',
    position: 'relative',
  },
  logo: {
    maxWidth: '200px',
    maxHeight: '100px',
    position: 'absolute',
    top: '65%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
    marginRight: theme.spacing(2),
    border: '1px solid #e0e0e0',
    marginLeft: 0,
    [theme.breakpoints.down(725)]: {
      display: 'none',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  btnLogin: {
    padding: '5px 15px',
    marginLeft: 'auto',
    marginRight: theme.spacing(2),
    fontSize: '1rem',
    fontWeight: '700',
    backgroundColor: '#FAA916',
    '&:hover': {
      backgroundColor: '#96031A',
    },
  },
  loginLink: {
    textDecoration: 'none',
    color: '#FBFFFE',
    '&:hover': {
      color: '#FAA916',
    }
  },
}));

const PrimarySearchAppBar = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static" classes={{ root: classes.appBar }}>
        <Toolbar>
          {props.state.user.name !== "" ? <FollowingDrawer /> : null}
          <div className={classes.logoDiv}>
            <Link to="/main">
              <img className={classes.logo} src={logoImage} alt="logo" />
            </Link>
          </div>
          {props.state.user.name !== "" ?
            <UploadVideoBtn
              original={true}
              btnName={"Upload challenge"}
              formTitle={"Upload Challenge"}
              formDescription={"To upload your Challenge, please enter its title, description and attach video file. Thank You!"}
            />
            : null}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={props.handleChange}
              type="search"
              placeholder="Search..."
              classes={{ input: classes.inputInput }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          {props.state.user.name !== "" ?
            <NavBarManu />
            :
            <Button className={classes.btnLogin}>
              <Link to="/login" className={classes.loginLink}>Login</Link>
            </Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(PrimarySearchAppBar);
