import React, { useEffect } from 'react';
import NavBar from './components/ui/NavBar';
import Main from './layouts/Main';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './layouts/Login';
import Loading from './components/common/Loading';
import Users from './layouts/Users';
import { ToastContainer } from 'react-toastify';
import { ProfessionProvider } from './hooks/useProfession';
import AuthProvider from './hooks/useAuth';
import ProtectedRoute from './components/common/ProtectedRoute';
import LogOut from './layouts/LogOut';
import { useDispatch } from 'react-redux';
import { loadQualitiesList } from './store/qualities';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);

  return (
    <>
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <ProfessionProvider>
          <Switch>
            <Route path='/login/:type?' component={Login} />
            <Route path='/logout' component={LogOut} />
            <ProtectedRoute path='/users/:userId?/:edit?' component={Users} />
            <Route path='/' component={Main} />
            <Route path='*' component={Loading} />
          </Switch>
        </ProfessionProvider>
      </AuthProvider>
    </BrowserRouter>
    <ToastContainer />
    </>
  );
};

export default App;
