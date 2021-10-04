import { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { useDispatch } from 'react-redux';
import { getUserUpdateAsync } from '../../store/user';
import LoginForm from '../LoginForm';
import Modal from '../Modal';
import Menu from './Menu';
import Navbar from './Navbar';

const loginSignupUser = async ({ email, password, type }) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  };

  switch (type) {
    case 'signup':
      return await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyArTcid8f8BiJBVaBGKrStd1JZBJR_t_60',
        requestOptions
      ).then((res) => res.json());
    case 'login':
      return await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArTcid8f8BiJBVaBGKrStd1JZBJR_t_60',
        requestOptions
      ).then((res) => res.json());
    default:
      return 'I cannot login user';
  }
};

const MenuHeader = ({ bgActive }) => {
  const [isOpen, setOpen] = useState(null);
  const [isOpenModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const handleClickHamburg = () => {
    setOpen((prevState) => !prevState);
  };
  const handleClickLogin = () => {
    setOpenModal((prevState) => !prevState);
  };
  const handleSubmitLoginForm = async (props) => {
    const response = await loginSignupUser(props);
    // console.log('response: ', response);
    if (response.hasOwnProperty('error')) {
      NotificationManager.error(response.error.message, 'Wrong!');
    } else {
      if (props.type === 'signup') {
        const pokemonsStart = await fetch(
          'https://reactmarathon-api.herokuapp.com/api/pokemons/starter'
        ).then((res) => res.json());
        // console.log('pokemonsStart: ', pokemonsStart);

        for (const item of pokemonsStart.data) {
          await fetch(
            `https://pokemon-game-58e6b-default-rtdb.firebaseio.com/${response.localId}/pokemons.json?auth=${response.idToken}`,
            {
              method: 'POST',
              body: JSON.stringify(item),
            }
          );
        }
      }
      localStorage.setItem('idToken', response.idToken);
      NotificationManager.success('Success!');
      dispatch(getUserUpdateAsync());
      handleClickLogin();
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
        <LoginForm
          isResetField={!isOpenModal}
          onSubmit={handleSubmitLoginForm}
        />
      </Modal>
    </>
  );
};

export default MenuHeader;
