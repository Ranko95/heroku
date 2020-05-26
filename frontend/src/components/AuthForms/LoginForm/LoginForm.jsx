import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../../../assets/logoAuth.png';
import googleIcon from '../../../assets/google.png';
import facebookIcon from '../../../assets/facebook.png';
import { fetchLoginAC } from '../../../redux/action-creator';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  image: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    textAlign: 'center'
  },
  error: {
    color: 'red',
    marginBottom: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    fontWeight: '700',
    fontSize: '1rem',
    backgroundColor: '#FAA916',
    color: '#FBFFFE',
    '&:hover': {
      backgroundColor: '#96031A',
      color: '#FAA916',
    },
    margin: theme.spacing(3, 0, 2),
  },
  or: {
    margin: theme.spacing(0, 0, 2),
  },
  social: {
    textAlign: 'center',
    margin: theme.spacing(3, 0, 2),
  },
  socialBtn: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  }
}));

function LoginForm(props) {
  const classes = useStyles();

  const [userInput, setUserInput] = useState(
    { email: '', password: '', message: '', },
  );

  const clickHandler = (e) => {
    e.preventDefault();
    const { href } = e.target.closest('.MuiButtonBase-root');
    window.location.href = href;
  }

  const changeHandler = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    })
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = userInput;
    const result = await props.fetchLogin(email, password);
    if (result.user) {
      window.location.href = 'http://localhost:3000/main';
    } else {
      setUserInput({
        ...userInput,
        message: result.message,
      });
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Box>
          <Box className={classes.image}>
            <Typography component="h1" variant="h4">
              Log in to
          </Typography>
            <Box>
              <Link to="/" >
                <img src={logo} alt="logo" />
              </Link>
            </Box>
          </Box>
          <Box className={classes.subtitle}>
            <Typography component="p" variant="subtitle">
              Manage your account, check challenges,
              comment on them, and more
          </Typography>
          </Box>
        </Box>
        <form className={classes.form} onSubmit={submitHandler}>
          {userInput.message ?
            <Typography className={classes.error}>
              {userInput.message}
            </Typography>
            : null
          }
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={changeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={changeHandler}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Box className={classes.social}>
            <Typography component="h1" variant="h5" className={classes.or}>
              OR
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  href="http://localhost:5000/auth/google"
                  onClick={clickHandler}
                  fullWidth
                  variant="contained"
                  color="inherit"
                  className={classes.socialBtn}
                >
                  <img src={googleIcon} alt="google" />
                Log In with Google
              </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  href="http://localhost:5000/auth/google"
                  onClick={clickHandler}
                  fullWidth
                  variant="contained"
                  color="inherit"
                  className={classes.socialBtn}
                >
                  <img src={facebookIcon} alt="facebook" />
                  Log In with Facebook
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Grid container justify="center">
            <Grid item>
              <Link to="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapDispatchToProps = dispatch => ({
  fetchLogin: (email, password) => dispatch(fetchLoginAC(email, password)),
});

export default connect(null, mapDispatchToProps)(LoginForm)
