import zxcvbn from 'zxcvbn';

const messages = [
  'Very weak password',
  'Weak password',
  'Average password',
  'Good password, but not enough',
  'Strong password',
];

const validatePasswordStrength = (password, threshold = 3) => {
  const { score } = zxcvbn(password);
  const isStrengthPassword = score > threshold;
  let strengthMessage = messages[score];

  return { isStrengthPassword, strengthMessage };
};

export default validatePasswordStrength;
