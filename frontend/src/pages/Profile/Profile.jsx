import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Box, Typography, Grid, Avatar, Paper, Container, Button } from '@material-ui/core';
import ProfileTabs from '../../components/ProfileTabs/ProfileTabs';
import NavBarIn from '../../components/NavBarIn/NavBarIn';
import { addUserAC } from '../../redux/action-creator';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(3),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    textAlign: 'left',
    margin: 'auto'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    height: '100%'
  },
}));

function Profile(props) {
  const classes = useStyles();

  const myChallenges = props.state.challenges.filter((challenge) => challenge.user._id === props.state.user._id && challenge.original);
  const myLikes = props.state.challenges.filter((challenge) => challenge.likes.includes(props.state.user._id));
  const myAnswers = props.state.challenges.filter((challenge) => challenge.user._id === props.state.user._id && (challenge.original === false));

  const handleImgUploading = (e) => {
    const img = e.target.files[0];
    const id = props.user._id;
    const data = new FormData();
    data.append('file', img);
    const response = fetch(`/profile/uploadImg`, {
      method: 'POST',
      body: data
    })
      .then(res => res.json())
      .then(imageUrl => fetch(`/profile/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: imageUrl.imageUrl, id })
      }))
      .then(res => res.json())
      .then(user => {
        props.updateUser(user.user)
      }
      )
      .catch(err => console.log(err));
  };

  return (
    <Fragment>
      <NavBarIn />
      <Container className={classes.container}>
        <Grid container direction="row" justify="flex-start" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={5} md={5} lg={4} xl={4}>
            <Paper className={classes.paper}>
              <Grid container direction="row" justify="flex-start" alignItems="stretch" spacing={2}>
                <Grid item xs={6} sm={12} md={6} lg={6} xl={6}>
                  <Avatar alt="Challenger" src={props.user.avatar} className={classes.large} />
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    onChange={handleImgUploading}
                  />
                  <label htmlFor="raised-button-file">
                    <Button variant="raised" component="span" className={classes.button}>Upload Avatar</Button>
                  </label>
                </Grid>
                <Grid item xs={6} sm={12} md={6} lg={6} xl={6}>
                  <Box mx="auto" my="10px">
                    <Typography variant="subtitle1" >Followers: </Typography><Typography variant="h5" >{props.user.followers.length || 0}</Typography>
                    <Typography variant="subtitle1" >Following: </Typography><Typography variant="h5" >{props.user.following.length || 0} </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={7} md={7} lg={8} xl={8}>
            <Paper className={classes.paper}>
              <Typography variant="h3" color="primary">{props.user.name || null}</Typography>
              <Typography variant="body1" component="span" >{props.user.email || null}</Typography>
              <Typography variant="h6" >{props.user.about || 'Nothing here, yet...'}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.root}>
              <ProfileTabs myChallenges={myChallenges} myLikes={myLikes} myAnswers={myAnswers} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({ state });
const mapDispatchToProps = (dispatch) => ({ 
  updateUser: (user) => dispatch(addUserAC(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
