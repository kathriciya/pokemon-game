import React from 'react';
import ReactDOM from 'react-dom';

const AppList = () => {
  return (
    <ul>
      <li>My First Element</li>
      <li>My Second Element</li>
    </ul>
  );
};

// const AppHeader = () => {
//   return <h1>This is my Header!</h1>;
// };

const AppHeader = () => <h1>This is my Header!</h1>;

const App = () => {
  return (
    <>
      <AppHeader />
      <AppList />
      <AppHeader />
      <AppList />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
