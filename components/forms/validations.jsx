const isValidEmail = (email) => {
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
};

const isValidPassword = (password) => {
    return password.length >= 6; // Password must be at least 8 characters
};

const isValidNick = (nick) => {
    let regex = /^[a-zA-Z0-9_-]+$/;
    return regex.test(nick);
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

export const ValidationsSignUp = (  fullName, setFullNameError, 
                                    alias, setAliasError, 
                                    nick, setNickError, 
                                    email, setEmailError, 
                                    password, setPasswordError,
                                    confirmPassword, setConfirmPasswordError) => {
    let isValid = true; 

    if (!fullName.trim()) {
        setFullNameError('Full name is required.');
        isValid = false;
    } else {
        setFullNameError(null);
    }

    if (!alias.trim()) {
        setAliasError('Please enter a valid alias')
        isValid = false;
    } else {
        setAliasError(null)
    }

    if (!isValidNick(nick)) {
        setNickError('Nick is required.');
        isValid = false;
    } else {
        setNickError(null);
    }

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

    if (password !== confirmPassword) {
        setConfirmPasswordError('Password and confirmation do not match.');
        isValid = false;
    } else {
        setConfirmPasswordError(null);
    }
    
    return isValid
};

export const ValidateEdit = (alias, setAliasError, nick, setNickError) => {
    let isValid = true;
    if (!alias.trim()) {
        setAliasError('Please enter a valid alias')
        isValid = false;
    } else {
        setAliasError(null)
    }
    if (!isValidNick(nick)) {
        setNickError('Nick is required.');
        isValid = false;
    } else {
        setNickError(null);
    }
    return isValid
}

export const ValidateForgot = (email, setEmailError) => {
    let isValid = true
    if (!isValidEmail(email)) {
        setEmailError('Please enter a valid email.');
        isValid = false
    } else {
        setEmailError(null)
    }
    return isValid
}
