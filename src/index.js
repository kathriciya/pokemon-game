import React from 'react';
import ReactDOM from 'react-dom';

const AppList = () => {
  const items = ['Items 1', 'Items 2', 'Items 3', 'Items 4'];
  const firstItems = <li>Items 0</li>;
  const isAuth = false;
  return (
    <ul>
      {isAuth ? firstItems : null}
      {items}
      {items.map((item) => (
        <li>{item}</li>
      ))}
      <li>{items[0]}</li>
      <li>{items[1]}</li>
    </ul>
  );
};

// const AppHeader = () => {
//   return <h1>This is my Header!</h1>;
// };

const AppHeader = () => <h1 className="App-header">This is my Header!</h1>;

const AppInput = () => {
  const placeholder = 'Type text...';
  return (
    <label htmlFor="search">
      <input id="search" placeholder={placeholder} />
    </label>
  );
};

const App = () => {
  return (
    <>
      <AppHeader />
      <AppInput />
      <AppList />
      <AppHeader />
      <AppList />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
