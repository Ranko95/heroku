import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomepageNavbar.module.css';
import Logo from '../../assets/logo.png';

const HomepageNavbar = () => {
  return (
    <div className={styles.homepageContainer}>
      <nav className={styles.homepageNavbar}>
        <div className={styles.logoContainer}>
          <img className={styles.logo} src={Logo} alt="logo" />
        </div>
        <div className={styles.homepageNavLinks}>
          <ul className={styles.homepageUL}>
            <Link className={styles.link} to="/main"><li>Watch</li></Link>
            <Link className={styles.link} to="/login"><li>Login</li></Link>
          </ul>
        </div>
      </nav>
    </div>
  );
};


export default HomepageNavbar;
