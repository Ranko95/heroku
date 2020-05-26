import React from 'react';
import { Divider, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ChallengeVideoCard from '../ChallengeVideoCard/ChallengeVideoCard';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    color: '#6D676E',
  },
  paper: {
    padding: theme.spacing(2),
  },
  card: {
    marginTop: theme.spacing(3),
  }
}));

function AnswerCard(props) {
  const classes = useStyles();

  const originalChallenge = props.challenge;
  const answers = props.state.challenges.filter(challenge => originalChallenge.title === challenge.title.slice(10));

  return (
    <div>
      <Paper className={classes.paper}>
        <Typography variant="h5" align="center" className={classes.title}>Answers</Typography>
        <Divider />
        {
          answers.map((challenge) => {
            return (
              <div className={classes.card}>
                <ChallengeVideoCard key={challenge._id} challenge={challenge} />
              </div>
            )
          })
        }
      </Paper>
    </div>
  );
}

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(AnswerCard);
