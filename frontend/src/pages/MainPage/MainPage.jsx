import React, { Fragment, useEffect, useState } from 'react';
import NavBarIn from '../../components/NavBarIn/NavBarIn';
import { connect } from 'react-redux';
import { fetchUserAC, fetchChallengesAC } from '../../redux/action-creator';
import MainTabs from '../../components/MainTabs/MainTabs';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core';

const MainPage = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(3),
    },
  }));

  const classes = useStyles();

  const [searchInput, setSearchInput] = useState({ searchField: '' });

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput({
      ...searchInput,
      searchField: value,
    });
  };

  const handleSearch = () => {
    if (searchInput.searchField) {
      return props.challenges.filter((challenge) =>
        challenge.hashtags.join().toLowerCase().includes(
          String(searchInput.searchField.toLowerCase())
        )
      );
    } else {
      return props.challenges;
    }
  };

  const fetchData = async () => {
    await props.fetchUser();
  };

  const fetchDataChallenges = async () => {
    await props.fetchChallenges();
  };

  useEffect(() => {
    if (!props.challenges.length) {
      fetchDataChallenges();
    }
    if (!props.user.name) {
      fetchData();
    }
  }, []);

  return (
    <Fragment>
      <NavBarIn handleChange={handleChange} />
      <Container className={classes.container}>
        <Grid item xs={12}>
          <MainTabs challenges={handleSearch()} />
        </Grid>
      </Container>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (user) => dispatch(fetchUserAC(user)),
  fetchChallenges: () => dispatch(fetchChallengesAC()),
});

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
