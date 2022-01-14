import React from 'react';
import NavBar from './components/ui/NavBar';
import Main from './layouts/Main';
import { Router, Route, Switch } from 'react-router-dom';
import Login from './layouts/Login';
import Loading from './components/common/Loading';
import Users from './layouts/Users';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './hooks/useAuth';
import ProtectedRoute from './components/common/ProtectedRoute';
import LogOut from './layouts/LogOut';
import history from './utils/history';
import AppLoader from './components/hoc/AppLoader';

const App = () => {
  return (
    <>
    <Router history={history}>
      <AppLoader>
      <AuthProvider>
        <NavBar />
          <Switch>
            <Route path='/login/:type?' component={Login} />
            <Route path='/logout' component={LogOut} />
            <ProtectedRoute path='/users/:userId?/:edit?' component={Users} />
            <Route path='/' component={Main} />
            <Route path='*' component={Loading} />
          </Switch>
      </AuthProvider>
      </AppLoader>
    </Router>
    <ToastContainer />
    </>
  );
};

export default App;
