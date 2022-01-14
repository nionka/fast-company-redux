import React, { useEffect, useState } from 'react';
import TextField from '../common/form/TextField';
import { validator } from '../../utils/validator';
import SelectField from '../common/form/SelectField';
import RadioField from '../common/form/RadioField';
import MultiSelectField from '../common/form/MultiSelectField';
import CheckBoxField from '../common/form/CheckBoxField';
import { useAuth } from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getQualities } from '../../store/qualities';
import { getProfessions } from '../../store/professions';

const RegisterForm = () => {
  const history = useHistory();
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
    profession: '',
    gender: 'male',
    qualities: [],
    licence: false
  });
  const professions = useSelector(getProfessions());
  const qualities = useSelector(getQualities());
  const { signUp } = useAuth();
  const [errors, setErrors] = useState({});
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

    const newData = { ...data, qualities: data.qualities.map((q) => q.value) };

    try {
      await signUp(newData);
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
    },
    name: {
      isRequired: { message: 'Имя обязательно для заполнения' }
    },
    profession: {
      isRequired: { message: 'Необходимо выбрать профессию' }
    },
    licence: {
      isRequired: { message: 'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения' }
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
              label='Имя'
              name='name'
              value={data.name}
              onChange={handleChange}
              error={errors.name}
            />
            <TextField
              label='Пароль'
              type='password'
              name='password'
              value={data.password}
              onChange={handleChange}
              error={errors.password}
            />
            <SelectField
              label="Выберите вашу профессию"
              defaultOption="Choose..."
              options={professions}
              value={data.profession}
              error={errors.profession}
              onChange={handleChange}
            />
            <RadioField
              label="Выберите ваш пол"
              options={[{ name: 'Male', value: 'male' }, { name: 'Female', value: 'female' }, { name: 'Other', value: 'other' }]}
              value={data.gender}
              name="gender"
              onChange={handleChange}
            />
            <MultiSelectField
              label="Выберите ваши качества"
              name="qualities"
              options={qualities}
              onChange={handleChange}
            />
            <CheckBoxField
              value={data.licence}
              onChange={handleChange}
              name="licence"
              error={errors.licence}
            >
              Подтвердить лицензионное соглашение
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

export default RegisterForm;
