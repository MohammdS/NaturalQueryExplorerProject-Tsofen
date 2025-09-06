// utils/validatePassword.js
function isStrongPassword(password) {
    const minLength = 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);


    return (
        typeof password === 'string' &&
        password.length >= minLength &&
        hasUpper &&
        hasLower &&
        hasDigit &&
        hasSpecial
    );
}

module.exports = { isStrongPassword };