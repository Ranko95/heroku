import React, { Fragment } from 'react';
import Loader from 'react-loader-spinner';



const LoadingBar = () => {
  return (
    <Fragment>
      <Loader
        type="ThreeDots"
        color="#1B1B1E"
        height={75}
        width={75}
      />
    </Fragment>
  )
}

export default LoadingBar;
