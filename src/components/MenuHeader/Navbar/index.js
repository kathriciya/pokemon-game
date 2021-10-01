import cn from 'classnames';
import s from './style.module.css';
import { ReactComponent as LoginSVG } from '../../../assets/login.svg';

const Navbar = ({ isOpen, onClickHamburg, bgActive = false, onClickLogin }) => {
  return (
    <nav className={cn(s.navbar, { [s.bgActive]: bgActive })}>
      <div className={s.navWrapper}>
        <p className={s.brand}>LOGO</p>
        <div className={s.loginAndMenu}>
          <div className={s.loginWrap} onClick={onClickLogin}>
            <LoginSVG />
          </div>
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
