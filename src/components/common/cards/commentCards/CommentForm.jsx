import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { validator } from '../../../../utils/validator';
import TextareaField from '../../form/TextareaField';
import SelectField from '../../form/SelectField';

const CommentForm = ({ users, onSubmit }) => {
  const [data, setData] = useState({ name: '', content: '' });
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = (target) => {
    setData(prev => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();

    if (!isValid) return;
    onSubmit(data);

    setData({ name: '', content: '' });
  };

  const validateConfig = {
    name: {
      isRequired: { message: 'Необходимо выбрать пользователя' }
    },
    content: {
      isRequired: { message: 'Напишите что-нибудь' }
    }
  };

  const validate = () => {
    const errors = validator(data, validateConfig);

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
        <SelectField
          label="Выберите ваше имя"
          defaultOption="Выберите пользователя"
          name="name"
          options={users}
          value={data.name}
          error={errors.name}
          onChange={handleChange}
        />
        <TextareaField
          label="Сообщение"
          name="content"
          onChange={handleChange}
          value={data.content}
          error={errors.content}

        />
        <button
          className="btn btn-primary ms-auto"
          disabled={!isValid}
          type="submit"
        >
          Опубликовать
        </button>
      </form>
  );
};

CommentForm.propTypes = {
  users: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onSubmit: PropTypes.func.isRequired
};

export default CommentForm;
