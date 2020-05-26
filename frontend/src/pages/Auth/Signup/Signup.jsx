import React, { Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import SignupForm from '../../../components/AuthForms/SignupForm/SignupForm';
import { connect } from 'react-redux';

const Signup = (props) => {

  if (props.user.name) {
    return <Redirect to="/main" />
  } else {
    return (
      <Fragment>
        <SignupForm/>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(Signup)
