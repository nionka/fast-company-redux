import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { getProfessionById, getProfessions } from '../../store/professions';
import { getQualities, getQualitiesByIds, getQualitiesLoadingStatus } from '../../store/qualities';
import { validator } from '../../utils/validator';
import MultiSelectField from '../common/form/MultiSelectField';
import RadioField from '../common/form/RadioField';
import SelectField from '../common/form/SelectField';
import TextField from '../common/form/TextField';
import Loading from '../common/Loading';

const EditForm = () => {
  const { currentUser, updateUser } = useAuth();
  const [user, setUser] = useState(currentUser);
  const professions = useSelector(getProfessions());
  const profession = useSelector(getProfessionById(user.profession));
  const qualities = useSelector(getQualities());
  const qualitiesByIds = useSelector(getQualitiesByIds(user.qualities));
  const isLoadingQualities = useSelector(getQualitiesLoadingStatus());
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;
  const params = useParams();
  const history = useHistory();
  const { userId } = params;

  useEffect(() => {
    validate();
  }, [user]);

  useEffect(() => {
    if (userId !== currentUser._id) {
      history.push(`/users/${currentUser._id}/edit`);
    };
  }, []);

  const handleChange = (target) => {
    let userValue = target.value;

    if (target.name === 'qualities') {
      userValue = target.value.map((v) => v.value);
    }

    setUser(prev => ({ ...prev, [target.name]: userValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(user);
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

  if (!user || isLoadingQualities || professions.length === 0) {
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
              defaultOption={profession.name}
              value={user.profession}
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
              defaultValue={qualitiesByIds}
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
