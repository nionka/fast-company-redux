import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import axios from 'axios';
import userService from '../services/user.service';
import { setTokens } from '../services/localStorage.service';

const httpAuth = axios.create();

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  async function signUp ({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
      setTokens(data);
      await createUser({ _id: data.localId, email, ...rest });
    } catch (error) {
      errorCather(error);
      const { code, message } = error.response.data.error;

      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObj = { email: 'Пользователь с таким email уже существует!' };
          throw errorObj;
        }
      }
    }
  };

  async function signIn ({ email, password }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
      setTokens(data);
    } catch (error) {
      errorCather(error);

      const { code, message } = error.response.data.error;

      if (code === 400) {
        let errorObj = {};
        if (message === 'EMAIL_NOT_FOUND') {
          errorObj = { email: 'Такого email не существует' };
        }

        if (message === 'INVALID_PASSWORD') {
          errorObj = { password: 'Неверный пароль' };
        }

        throw errorObj;
      }
    }
  }

  async function createUser (data) {
    try {
      const { content } = userService.create(data);
      setUser(content);
    } catch (error) {
      errorCather(error);
    }
  };

  function errorCather (error) {
    const { message } = error.response.data;
    setError(message);
  }

  return (
    <AuthContext.Provider value={{ signUp, signIn, currentUser }}>
        {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;
