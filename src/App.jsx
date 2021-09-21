import React from 'react';
import Users from './components/users';
import NavBar from './components/NavBar';
import Main from './components/Main';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import CurrentUser from './components/CurrentUser';
import Loading from './components/Loading';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/users/:id' component={CurrentUser} />
        <Route path='/users' component={Users} />
        <Route path='/' component={Main} />
        <Route path='*' component={Loading} />
      </Switch>
    </BrowserRouter>
    </>
  );
};

export default App;
