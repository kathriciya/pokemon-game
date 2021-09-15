import cn from 'classnames';
import s from './style.module.css';

const Menu = ({ isActive, onClickButton }) => {
  const handleClick = (evt) => {
    evt.preventDefault();
    console.log('Menu');
    onClickButton && onClickButton();
  };
  return (
    <div
      className={cn(
        s.menuContainer,
        { [s.active]: isActive },
        { [s.deactive]: !isActive }
      )}
    >
      <div className={s.overlay} />
      <div className={s.menuItems}>
        <ul>
          <li>
            <a href="#welcome" onClick={handleClick}>
              HOME
            </a>
          </li>
          <li>
            <a href="#game" onClick={handleClick}>
              GAME
            </a>
          </li>
          <li>
            <a href="#about">ABOUT</a>
          </li>
          <li>
            <a href="#contact">CONTACT</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
