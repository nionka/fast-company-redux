import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import axios from 'axios';
import userService from '../services/user.service';
import localStorageService, { setTokens } from '../services/localStorage.service';
import { useHistory } from 'react-router-dom';
import { rundomImg } from '../utils/rundomImg';

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/'
});

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);

  function randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async function getUserData () {
    try {
      const { content } = await userService.getCurrentUser();
      setUser(content);
    } catch (error) {
      errorCather(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateUser (data) {
    try {
      const { content } = await userService.update(data);
      setUser(content);
    } catch (error) {
      errorCather(error);
    } finally {
      setLoading(false);
    }
  }

  async function signUp ({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
      setTokens(data);
      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        image: rundomImg(),
        ...rest
      });
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
      await getUserData();
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

  function logOut () {
    localStorageService.removeAuthData();
    setUser(null);
    history.push('/');
  }

  async function createUser (data) {
    try {
      const { content } = await userService.create(data);
      console.log(content);
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
    <AuthContext.Provider value={{ signUp, signIn, logOut, updateUser, currentUser }}>
        {!isLoading ? children : 'Loading...'}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;
