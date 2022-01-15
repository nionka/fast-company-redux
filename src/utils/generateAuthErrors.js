function generateAuthError (message) {
  switch (message) {
    case 'EMAIL_EXISTS':
      return 'Пользователь с таким email уже существует!';
    case 'EMAIL_NOT_FOUND':
      return 'Такого email не существует';
    case 'INVALID_PASSWORD':
      return 'Неверный пароль';
    default:
      break;
  }
}

export default generateAuthError;
