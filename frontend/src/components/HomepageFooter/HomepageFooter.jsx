import React from 'react';
import styles from './HomepageFooter.module.css';
import owlLogo from '../../assets/owl_logo.png';
import githubLogo from '../../assets/github.svg';
import HomepageModal from '../HomepageModal/HomepageModal';

const HomepageFooter = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerSlogan}>
        <p>
          IT IS YOUR TURN
          <br />
        </p>
        <p>TO BECOME FAMOUS</p>
      </div>
      <div className={styles.footerContact}>
        <p>Contact Us</p>
        <div className={styles.footerContactContainer}>
            <a target="_blank" href="https://github.com/NikSubbo/ChallengeAccepted">
            <img
              className={styles.footerSocial}
              src={githubLogo}
              alt="github-logo"
            />
            </a>
            <HomepageModal />
        </div>
      </div>
      <div className={styles.footerRights}>
        <p className={styles.footerParagraph}>
          &copy;SPB 2020, <br /> All Rights Reserved
        </p>
        <div className={styles.footerimgContainer}>
          <img className={styles.footerLogo} src={owlLogo} alt="owl" />
        </div>
      </div>
    </div>
  );
};

export default HomepageFooter;
