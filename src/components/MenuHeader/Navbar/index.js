import cn from 'classnames';
import s from './style.module.css';
import { ReactComponent as LoginSVG } from '../../../assets/login.svg';
import { ReactComponent as UserSVG } from '../../../assets/user.svg';
import { useSelector } from 'react-redux';
import { selectUserLoading, selectLocalID } from '../../../store/user';
import { Link } from 'react-router-dom';

const Navbar = ({ isOpen, onClickHamburg, bgActive = false, onClickLogin }) => {
  const isLoadingUser = useSelector(selectUserLoading);
  const localID = useSelector(selectLocalID);
  console.log('isLoadingUser: ', isLoadingUser);
  console.log('localID: ', localID);
  return (
    <nav className={cn(s.navbar, { [s.bgActive]: bgActive })}>
      <div className={s.navWrapper}>
        <p className={s.brand}>LOGO</p>
        <div className={s.loginAndMenu}>
          {!isLoadingUser && !localID && (
            <div className={s.loginWrap} onClick={onClickLogin}>
              <LoginSVG />
            </div>
          )}
          {!isLoadingUser && localID && (
            <Link className={s.loginWrap} to="/user">
              <UserSVG />
            </Link>
          )}

          <div
            className={cn(s.menuButton, { [s.active]: isOpen })}
            onClick={onClickHamburg}
          >
            <span />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
