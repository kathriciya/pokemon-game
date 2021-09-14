import { useState } from 'react';
import Menu from './Menu';
import Navbar from './Navbar';

const MenuHeader = () => {
  const [isActive, setActive] = useState(false);
  const handleClick = () => {
    setActive(!isActive);
    console.log('MenuHeader click');
  };
  return (
    <>
      <Menu isActive={isActive} onClickButton={handleClick} />
      <Navbar isActive={isActive} onClickButton={handleClick} />
    </>
  );
};

export default MenuHeader;
