import zxcvbn from 'zxcvbn';

const validatePasswordStrength = password => zxcvbn(password).score > 2;

export default validatePasswordStrength;
