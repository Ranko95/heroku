import React from 'react';
import ChallengeVideo from '../../assets/IceBucketChallenge.mp4';
import styles from './HomepageVideo.module.css';

const HomepageVideo = () => {
  return (
    <div className={styles.homepageVideoContainer}>
      <div className={styles.overlay}></div>
      <video className={styles.video} autoPlay loop muted>
        <source src={ChallengeVideo} type="video/mp4" />
      </video>
      <div className={styles.homepageCont}>
        <h1 className={styles.homepageHeader}>Challenge The World!</h1>
      </div>
    </div>
  );
};

export default HomepageVideo;
