export default {
  required: 'Campo obrigatório.',
  email: 'Formato inválido.',
  number: 'Campo precisa ser um número.',
  minLength: length => `O campo precisa ter pelo menos ${length} caracteres.`,
  maxLength: length => `O campo precisa ter no máximo ${length} caracteres.`,
  length: length => `O campo precisa ter ${length} caracteres.`,
  req: 'Por favor, cheque os dados e tente novamente.',
  age: 'Idade é obrigatória',
  tryAgain: 'Houve um erro. Por favor, tente novamente.',
  equalPasswords: 'As senhas precisam ser iguais.',
};
