// src/helpers/validators.ts

export const isEmpty = (value: string) => {
  return !value || value.trim().length === 0;
};

export const isValidEmail = (email: string) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

export const isValidMobile = (mobile: string) => {
  const pattern = /^[6-9]\d{9}$/; // Indian mobile number
  return pattern.test(mobile);
};

export const onlyNubers = (value: string) => {
  const pattern = /^\d+$/;
  return pattern.test(value);
}

export const onlyLetters = (value: string) => {
  const pattern = /^[A-Za-z ]+$/;
  return pattern.test(value);
}

export const validateWives = (wives: any[]) => {
  for (let i = 0; i < wives.length; i++) {
    const wife = wives[i];

    if (!wife.name || wife.name.trim() === "") {
      return `Wife ${i + 1}: Name required`;
    }

    if (!wife.email || !isValidEmail(wife.email)) {
      return `Wife ${i + 1}: Valid Email required`;
    }
  }

  return null; // no errors
};

export const validateImageSize = (fileSize: number) => {
  const max = 100 * 1024; // 100KB
  return fileSize <= max;
};

export default {
  isEmpty,
  isValidEmail,
  onlyNubers,
  isValidMobile,
  validateWives,
  onlyLetters,
  validateImageSize,
};