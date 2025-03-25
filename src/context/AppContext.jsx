import React, { createContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const { i18n } = useTranslation('common');
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('authToken'));
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark' || (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });
    const [direction, setDirection] = useState(i18n.language === 'ar' ? 'rtl' : 'ltr');
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        setDirection(i18n.language === 'ar' ? 'rtl' : 'ltr');
    }, [i18n.language]);

    useEffect(() => {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode((prev) => !prev);
    const handleLanguageChange = (value) => i18n.changeLanguage(value);
    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };

    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                isDarkMode,
                toggleTheme,
                direction,
                collapsed,
                setCollapsed,
                i18n,
                handleLanguageChange,
                logout,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};