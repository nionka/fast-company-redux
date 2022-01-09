import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { validator } from '../../../../utils/validator';
import TextareaField from '../../form/TextareaField';

const CommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({ content: '' });
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

    setData({ content: '' });
  };

  const validateConfig = {
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
  onSubmit: PropTypes.func.isRequired
};

export default CommentForm;
