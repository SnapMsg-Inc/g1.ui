const isValidEmail = (email) => {
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
};

const isValidPassword = (password) => {
    return password.length >= 6; // Password must be at least 8 characters
};

export const ValidationsLogin = (email, password, setEmailError, setPasswordError) => {
    let isValid = true;
    if (!isValidEmail(email)) {
        setEmailError('Please enter a valid email.');
        isValid = false;
    } else {
        setEmailError(null);
    }
    if (!isValidPassword(password)) {
        setPasswordError('Password should be at least 6 characters long.');
        isValid = false;
    } else {
        setPasswordError(null);
    }
    return isValid
}
