import s from './style.module.css';
import Layout from '../../components/Layout';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user';
import { useDispatch } from 'react-redux';
import { removeUser, fetchUser } from '../../store/user';
// import { useHistory } from 'react-router';

const UserPage = () => {
  const userData = useSelector(selectUser);
  const localId = userData.localId;
  const email = userData.email;
  const getTime = (date) =>
    new Date(parseInt(date, 10)).toLocaleString('uk-UA');
  const time = getTime(userData.createdAt);
  // console.log('time: ', time);
  const dispatch = useDispatch();
  // const history = useHistory();

  const handleLogOut = () => {
    localStorage.removeItem('idToken');
    dispatch(fetchUser());
    dispatch(removeUser());
    // history.push('/');
  };
  return (
    <>
      <Layout title="User Info" desc="..." colorBg="#a496f2">
        <div className={s.flex}>
          <div className={s.item}>
            <b>Id:</b> {localId}
          </div>
          <div className={s.item}>
            <b>Email:</b> {email}
          </div>
          <div className={s.item}>
            <b>CreatedAt:</b> {time}
          </div>
        </div>
        <button className={s.button} onClick={handleLogOut}>
          Log out
        </button>
      </Layout>
    </>
  );
};

export default UserPage;
