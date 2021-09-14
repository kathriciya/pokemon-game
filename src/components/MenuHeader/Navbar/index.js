import cn from 'classnames';
import s from './style.module.css';

const Navbar = ({ isActive, onClickButton }) => {
  const changeNavbar = (evt) => {
    evt.preventDefault();
    console.log('Navbar click');
    onClickButton && onClickButton();
  };
  return (
    <nav className={s.root}>
      <div className={s.navWrapper}>
        <p className={s.brand}>LOGO</p>
        <a
          href="#s"
          onClick={changeNavbar}
          className={cn(
            s.menuButton,
            { [s.active]: isActive },
            { [s.deactive]: !isActive }
          )}
        >
          <span />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
