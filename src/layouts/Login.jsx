import React, { useState } from 'react';
import { useParams } from 'react-router';
import LoginForm from '../components/ui/LoginForm';
import RegisterForm from '../components/ui/RegisterForm';

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(type === 'register' ? type : 'login');

  const toggleFormType = () => {
    setFormType(prev => prev === 'register' ? 'login' : 'register');
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
            {formType === 'register'
              ? <>
                <h3 className="mb-4">Регистрация</h3>
                <RegisterForm />
                  <div className="mt-2">У вас уже есть аккаунт? <a role='button' className="text-primary" onClick={toggleFormType}>Войти</a></div>
                </>
              : <>
                  <h3 className="mb-4">Вход</h3>
                  <LoginForm />
                  <div className="mt-2">У вас нет аккаунта? <a role='button' className="text-primary" onClick={toggleFormType}>Создать</a></div>
                </>}
        </div>
      </div>
    </div>
  );
};

export default Login;
