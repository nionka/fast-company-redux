import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import api from '../../api';
import { validator } from '../../utils/validator';
import MultiSelectField from '../common/form/MultiSelectField';
import RadioField from '../common/form/RadioField';
import SelectField from '../common/form/SelectField';
import TextField from '../common/form/TextField';
import Loading from '../common/Loading';

const EditForm = () => {
  const [user, setUser] = useState();
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState({});
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;
  const params = useParams();
  const history = useHistory();
  const { userId } = params;

  useEffect(() => {
    validate();
  }, [user]);

  useEffect(() => {
    api.users.getById(userId)
      .then(response => {
        if (!response.email) {
          setUser({ ...response, email: '' });
        } else {
          setUser(response);
        }
      });
    api.professions.fetchAll()
      .then(response => setProfessions(response));
    api.qualities.fetchAll()
      .then(response => setQualities(response));
  }, []);

  const handleChange = (target) => {
    let userValue = target.value;

    if (target.name === 'profession') {
      for (const key in professions) {
        if (professions[key]._id === target.value) {
          userValue = professions[key];
        }
      }
    }

    if (target.name === 'qualities') {
      userValue = [];
      for (const key in qualities) {
        target.value.forEach(qual => {
          if (qual.value === qualities[key]._id) {
            userValue.push(qualities[key]);
          }
        });
      }
    }

    setUser(prev => ({ ...prev, [target.name]: userValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.users.update(userId, user);
    history.push(`/users/${userId}`);
  };

  const handleBack = () => {
    history.push(`/users/${userId}`);
  };

  const validateConfig = {
    name: {
      isRequired: { message: 'Имя обязательно для заполнения' }
    },
    email: {
      isRequired: { message: 'Электронная почта обязательна для заполнения' },
      isEmail: { message: 'Почта введена некорректно' }
    }
  };

  const validate = () => {
    const errors = validator(user, validateConfig);

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="container mt-5">
      <button className="btn btn-primary" onClick={handleBack}>
        <i className="bi bi-caret-left"></i>Назад
      </button>
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
        <form onSubmit={handleSubmit}>
            <TextField
              label="Имя"
              name="name"
              value={user.name}
              error={errors.name}
              onChange={handleChange}
            />
            <TextField
              label="Электронная почта"
              name="email"
              value={user.email || ''}
              error={errors.email}
              onChange={handleChange}
            />
            <SelectField
              label="Выберите свою профессию"
              defaultOption={user.profession.name}
              value={user.profession._id}
              options={professions}
              onChange={handleChange}
            />
            <RadioField
              label="Выберите ваш пол"
              options={[{ name: 'Male', value: 'male' }, { name: 'Female', value: 'female' }, { name: 'Other', value: 'other' }]}
              value={user.gender || 'male'}
              name="gender"
              onChange={handleChange}
            />
            <MultiSelectField
              label="Выберите ваши качества"
              name="qualities"
              defaultValue={user.qualities}
              options={qualities}
              onChange={handleChange}
            />
            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto"
            >
              Обновить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
