import React, { useEffect, useState } from 'react';
import TextField from '../common/form/TextField';
import CheckBoxField from '../common/form/CheckBoxField';
import { validator } from '../../utils/validator';
import { useAuth } from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false });
  const [errors, setErrors] = useState({});
  const { signIn } = useAuth();
  const history = useHistory();
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = (target) => {
    setData(prev => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();

    if (!isValid) return;

    try {
      await signIn(data);
      history.push('/');
    } catch (error) {
      setErrors(error);
    }
  };

  const validateConfig = {
    email: {
      isRequired: { message: 'Электронная почта обязательна для заполнения' },
      isEmail: { message: 'Почта введена некорректно' }
    },
    password: {
      isRequired: { message: 'Пароль обязателен для заполнения' },
      isCapitalSymbol: { message: 'Пароль должен содержать хотя бы одну заглавную букву' },
      isContainDigit: { message: 'Пароль должен содержать хотя бы одну цифру' },
      min: { message: 'Длина пароля - не меньше 8 символов', value: 8 }
    }
  };

  const validate = () => {
    const errors = validator(data, validateConfig);

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <>
          <form onSubmit={handleSubmit}>
            <TextField
              label='Электронная почта'
              name='email'
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            <TextField
              label='Пароль'
              type='password'
              name='password'
              value={data.password}
              onChange={handleChange}
              error={errors.password}
            />
            <CheckBoxField
              value={data.stayOn}
              onChange={handleChange}
              name="stayOn"
            >
              Оставаться в системе
            </CheckBoxField>
            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto"
            >
              Отправить
            </button>
          </form>
     </>
  );
};

export default LoginForm;
