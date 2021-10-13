import React, { useEffect, useState } from 'react';
import TextField from '../common/form/TextField';
import { validator } from '../../utils/validator';
import api from '../../api';
import SelectField from '../common/form/SelectField';
import RadioField from '../common/form/RadioField';
import MultiSelectField from '../common/form/MultiSelectField';
import CheckBoxField from '../common/form/CheckBoxField';

const RegisterForm = () => {
  const [data, setData] = useState({ email: '', password: '', profession: '', gender: 'male', qualities: [], licence: false });
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState({});
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [data]);

  useEffect(() => {
    api.professions.fetchAll()
      .then(response => setProfessions(response));
    api.qualities.fetchAll()
      .then(response => setQualities(response));
  }, []);

  const handleChange = (target) => {
    setData(prev => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();

    if (!isValid) return;

    console.log(data);
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
