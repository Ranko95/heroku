import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Box, Grid, Tab, Tabs, Typography } from '@material-ui/core/';
import { connect } from 'react-redux';

import ChallengeCard from '../ChallengeVideoCard/ChallengeVideoCard';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  paper: {
    margin: 200,
    textAlign: 'center',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    height: '100%'
  },

}));

const ProfileTabs = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="My Challenges" {...a11yProps(0)} />
          <Tab label="My Answers" {...a11yProps(1)} />
          <Tab label="My Likes" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction} >
          <Grid container spacing={3} >
            {
              props.myChallenges.length
                ? props.myChallenges.map((challenge) => {
                  return (
                    <Grid key={challenge._id} item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <ChallengeCard challenge={challenge} />
                    </Grid>
                  )
                })
                : null
            }
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Grid container spacing={3} >
          {
              props.myAnswers.length
                ? props.myAnswers.map((challenge) => {
                  return (
                    <Grid key={challenge._id} item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <ChallengeCard challenge={challenge} />
                    </Grid>
                  )
                })
                : null
            }
            </Grid>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Grid container spacing={3} > 
          {
              props.myLikes.length
                ? props.myLikes.map((challenge) => {
                  return (
                    <Grid key={challenge._id} item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <ChallengeCard challenge={challenge} />
                    </Grid>
                  )
                })
                : null
            }
          </Grid>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(ProfileTabs);


