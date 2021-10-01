import { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import LoginForm from '../LoginForm';
import Modal from '../Modal';
import Menu from './Menu';
import Navbar from './Navbar';

const MenuHeader = ({ bgActive }) => {
  const [isOpen, setOpen] = useState(null);
  const [isOpenModal, setOpenModal] = useState(false);
  const handleClickHamburg = () => {
    setOpen((prevState) => !prevState);
  };
  const handleClickLogin = () => {
    setOpenModal((prevState) => !prevState);
  };
  const handleSubmitLoginForm = async ({ email, password, auth }) => {
    // console.log('values: ', values);
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    };

    let response;

    if (auth === false) {
      response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyArTcid8f8BiJBVaBGKrStd1JZBJR_t_60',
        requestOptions
      ).then((res) => res.json());
      // console.log('response : ', response);
    }
    if (auth === true) {
      response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArTcid8f8BiJBVaBGKrStd1JZBJR_t_60',
        requestOptions
      ).then((res) => res.json());
      // console.log('response : ', response);
    }

    if (response.hasOwnProperty('error')) {
      NotificationManager.error(response.error.message, 'Wrong!');
    } else {
      if (auth === true) {
        localStorage.setItem('idToken', response.idToken);
      }
      NotificationManager.success('Success!');
    }
  };

  return (
    <>
      <Menu isOpen={isOpen} onClickHamburg={handleClickHamburg} />
      <Navbar
        isOpen={isOpen}
        bgActive={bgActive}
        onClickHamburg={handleClickHamburg}
        onClickLogin={handleClickLogin}
      />
      <Modal
        title="Log in..."
        onCloseModal={handleClickLogin}
        isOpen={isOpenModal}
      >
        <LoginForm onSubmit={handleSubmitLoginForm} />
      </Modal>
    </>
  );
};

export default MenuHeader;
