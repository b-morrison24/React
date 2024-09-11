// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Validate password strength
function validatePassword(password) {
    return password.length >= 6;
}

module.exports = {
    validateEmail,
    validatePassword,
};
