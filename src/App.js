// import { useState } from 'react';
import { useLocation, Route, Switch, Redirect } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import cn from 'classnames';
import s from './style.module.css';
import Footer from './components/Footer';
import MenuHeader from './components/MenuHeader';
import GamePage from './routes/Game';
import HomePage from './routes/Home';
import AboutPage from './routes/About';
import ContactPage from './routes/Contact';
import NotFound from './routes/NotFound';
import UserPage from './routes/User';
import 'react-notifications/lib/notifications.css';
import PrivateRoute from './components/PrivateRoute';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getUserAsync } from './store/user';
import { selectUserLoading } from './store/user';

const App = () => {
  const isUserLoading = useSelector(selectUserLoading);
  const location = useLocation();
  const isPadding =
    location.pathname === '/' || location.pathname === '/game/board';
  const dispatch = useDispatch();
  console.log('isUserLoading : ', isUserLoading);

  useEffect(() => {
    dispatch(getUserAsync());
  }, []);

  if (isUserLoading) {
    return 'Loading...';
  }
  return (
    <>
      <Switch>
        <Route path="/404" component={NotFound} />
        <Route>
          <>
            <MenuHeader bgActive={!isPadding} />
            <div className={cn(s.wrap, { [s.isHomePage]: isPadding })}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <PrivateRoute path="/game" component={GamePage} />
                <PrivateRoute path="/about" component={AboutPage} />
                <PrivateRoute path="/contact" component={ContactPage} />
                <PrivateRoute path="/user" component={UserPage} />
                <Route render={() => <Redirect to="/404" />} />
              </Switch>
            </div>
            <Footer />
          </>
        </Route>
      </Switch>
      <NotificationContainer />
    </>
  );
};

export default App;
