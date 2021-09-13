import s from './style.module.css';

const Header = ({ title, desc, onClickButton }) => {
  const handleClick = () => {
    console.log('###: <Header/>');
    onClickButton && onClickButton('game');
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
