import React, { Fragment, useEffect } from 'react';
import HomepageNavbar from '../../components/HomepageNavbar/HomepageNavbar';
import HomepageFooter from '../../components/HomepageFooter/HomepageFooter';
import HomepageVideo from '../../components/HomepageVideo/HomepageVideo';
import { connect } from 'react-redux';
import { fetchUserAC } from '../../redux/action-creator';
import { Redirect } from 'react-router-dom';

const Homepage = (props) => {

  const fetchData = async () => {
    await props.fetchUser();
  }

  useEffect(() => {
    if (!props.user.name) {
     fetchData();
    }
  }, [])

  if (props.user.name) {
    return <Redirect to="/main" />
  } else {
    return (
      <Fragment>
        <HomepageNavbar />
        <HomepageVideo />
        <HomepageFooter />
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUser: (user) => dispatch(fetchUserAC(user)),
});

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
