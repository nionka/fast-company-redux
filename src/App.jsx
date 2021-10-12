import React from 'react';
import UsersList from './components/page/UsersListPage/UsersListPage';
import NavBar from './components/ui/NavBar';
import Main from './layouts/Main';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './layouts/Login';
import Loading from './components/common/Loading';
import UserPage from './components/page/UserPage/UserPage';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login/:type?' component={Login} />
        <Route path='/users/:id' component={UserPage} />
        <Route path='/users' component={UsersList} />
        <Route path='/' component={Main} />
        <Route path='*' component={Loading} />
      </Switch>
    </BrowserRouter>
    </>
  );
};

export default App;
