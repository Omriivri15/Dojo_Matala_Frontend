// Email validation: text@domain.com
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  const [name, domain] = parts;
  if (!name || name.length === 0) return false;
  if (!domain || !domain.endsWith('.com')) return false;
  const domainParts = domain.split('.');
  if (domainParts.length !== 2 || domainParts[1] !== 'com') return false;
  return true;
};

// Password validation
export const isValidPassword = (password) => {
  return password && password.length >= 8;
};

// Validate login form
export const validateLogin = (email, password) => {
  const errors = {};

  if (!email) {
    errors.email = '* Required Field';
  } else if (!isValidEmail(email)) {
    errors.email = '* Invalid Email';
  }

  if (!password) {
    errors.password = '* Required Field';
  } else if (password.length < 8) {
    errors.password = '* Password must be 8+ characters';
  }

  return errors;
};


export const validateSignup = (fullName, email, password, confirmPassword) => {
  const errors = {};

  if (!fullName) {
    errors.fullName = '* Required Field';
  }

  if (!email) {
    errors.email = '* Required Field';
  } else if (!isValidEmail(email)) {
    errors.email = '* Invalid Email';
  }

  if (!password) {
    errors.password = '* Required Field';
  } else if (password.length < 8) {
    errors.password = '* Password must be 8+ characters';
  }

  if (!confirmPassword) {
    errors.confirmPassword = '* Required Field';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = '* Passwords do not match';
  }

  return errors;
};

