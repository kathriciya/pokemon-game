//import React from 'react'; --deprecated
import s from './style.module.css';
console.log('s: ', s);

const HeaderBlock = () => {
  return (
    <div>
      <div>
        <h1 className={s.header}>This is Pokemon Card Game</h1>
        <p>Simple Triple Triad Card Game</p>
      </div>
    </div>
  );
};

export default HeaderBlock;
