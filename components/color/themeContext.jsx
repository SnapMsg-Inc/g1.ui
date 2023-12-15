import React, { createContext, useState, useContext, useEffect } from 'react';
import { colorBackground, colorApp, colorText, colorWhite } from '../../styles/appColors/appColors'
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    const toggleTheme = async () => {
        setDarkMode(!darkMode);
        await AsyncStorage.setItem('theme', !darkMode ? 'dark' : 'light')
    };

    const setThemeStorage = async () => {
        const theme = await AsyncStorage.getItem('theme')
        if (!theme) {
            await AsyncStorage.setItem('theme', darkMode ? 'dark' : 'light')
        }
        setDarkMode(theme === 'dark')
    }

    useEffect(() => {
        setThemeStorage()
    }, [])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return useContext(ThemeContext);
};
