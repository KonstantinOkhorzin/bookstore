import zxcvbn from 'zxcvbn';

const messages = [
  'Very weak password',
  'Weak password',
  'Average password',
  'Good password, but not enough',
  'Strong password',
];

const colors = ['#d32f2f', '#f57c00', '#fbc02d', '#4ed554', '#2e7d32'];

const validatePasswordStrength = (password: string, threshold = 3) => {
  const { score } = zxcvbn(password);

  return {
    isStrong: score > threshold,
    message: messages[score],
    color: colors[score],
    score,
  };
};

export default validatePasswordStrength;
