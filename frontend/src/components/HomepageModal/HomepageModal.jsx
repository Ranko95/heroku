import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import mailLogo from '../../assets/mailSolid.svg';
import styles from '../HomepageFooter/HomepageFooter.module.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    height: '40%',
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
};

Modal.setAppElement('#root');

const HomepageModal = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [userInput, setUserInput] = useState(
    { name: '', email: '',  msg: '' },
  );

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  };

  const closeModal = () => {
    setIsOpen(false);
  };


  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    })
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, email, msg } = userInput;
    const response = await fetch('/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, msg })
    })
    if(response.ok) {
      closeModal();
    }
  }

  return (
    <div>
      <a onClick={openModal}>
        <img className={styles.footerSocial} src={mailLogo} alt="github-logo" />
      </a>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="emailForm"
      >
        <div className={styles.emailContainer}>
          <form className={styles.emailForm} onSubmit={submitHandler}>
            <h1 className={styles.emailHeader}>Contact Us</h1>
            <div>
              <input
                className={styles.emailInput}
                name="name"
                type="text"
                placeholder="Your Name..."
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className={styles.emailInput}
                name="email"
                type="email"
                placeholder="Your Email..."
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <textarea
                className={styles.emailMsg}
                name="msg"
                type="textarea"
                placeholder="Your Message..."
                onChange={handleChange}
                required
              />
            </div>
            <button className={styles.emailBtn} onClick={submitHandler}>
              SEND
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default HomepageModal;
