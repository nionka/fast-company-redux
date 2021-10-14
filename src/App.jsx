import React from 'react';
import NavBar from './components/ui/NavBar';
import Main from './layouts/Main';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './layouts/Login';
import Loading from './components/common/Loading';
import Users from './layouts/Users';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login/:type?' component={Login} />
        <Route path='/users/:userId?' component={Users} />
        <Route path='/' component={Main} />
        <Route path='*' component={Loading} />
      </Switch>
    </BrowserRouter>
    </>
  );
};

export default App;
