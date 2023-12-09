import React, { createContext, useState, useContext } from 'react';
import { colorBackground, colorApp, colorText, colorWhite } from '../../styles/appColors/appColors'

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true);

    const theme = {
        backgroundColor: darkMode ? colorBackground : colorWhite,
        appColor: colorApp,
        textColor: colorText,
        whiteColor: darkMode ? colorWhite : colorBackground,
        progressColor: darkMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255, 1)'
    };

    const toggleTheme = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return useContext(ThemeContext);
};
