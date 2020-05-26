import React, { Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from '../../../components/AuthForms/LoginForm/LoginForm';
import { connect } from 'react-redux';

const Login = (props) => {

  if (props.user.name) {
    return <Redirect to="/main" />
  } else {
    return (
      <Fragment>
        <LoginForm />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(Login)
