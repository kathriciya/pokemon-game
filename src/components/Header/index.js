import { useHistory } from 'react-router';
import s from './style.module.css';

const Header = ({ title, desc }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/game');
  };
  return (
    <>
      <header className={s.root}>
        <div className={s.forest}>
          <div className={s.container}>
            <h1>{title}</h1>
            <p>{desc}</p>
            <button onClick={handleClick}>Start Game</button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
