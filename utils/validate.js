module.exports.validateEmail = (email) => !!email.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
