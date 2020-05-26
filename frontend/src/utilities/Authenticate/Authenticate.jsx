import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchUserAC } from '../../redux/action-creator';

export default function(ComposedComponent) {

  
  const Authenticate = (props) => {

    useEffect(() => {
      if (!props.user.name) {
        props.history.push('/');
      }
    }, [props.user])

    return (
      <ComposedComponent { ...props } />
    )
  }

  const mapDispatchToProps = dispatch => ({
    fetchUser: (user) => dispatch(fetchUserAC(user)),
  });

  const mapStateToProps = (state) => {
    return {
      user: state.user,
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate)
}
