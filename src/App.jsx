import React from 'react';
import NavBar from './components/ui/NavBar';
import Main from './layouts/Main';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './layouts/Login';
import Loading from './components/common/Loading';
import Users from './layouts/Users';
import { ToastContainer } from 'react-toastify';
import { ProfessionProvider } from './hooks/useProfession';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <NavBar />
      <ProfessionProvider>
        <Switch>
          <Route path='/login/:type?' component={Login} />
          <Route path='/users/:userId?/:edit?' component={Users} />
          <Route path='/' component={Main} />
          <Route path='*' component={Loading} />
        </Switch>
      </ProfessionProvider>
    </BrowserRouter>
    <ToastContainer />
    </>
  );
};

export default App;
