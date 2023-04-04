const isRequired = (value) => {
  if (value) {
    return true;
  }

  return 'Este campo é obrigatório';
};

const validateEmail = (value) => {
  if (!value) {
    return 'O campo e-mail é obrigatório';
  }
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return 'Este não é um endereço de e-mail válido';
  }
  return true;
};

export { isRequired, validateEmail };
