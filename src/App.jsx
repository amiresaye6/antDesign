import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import AuthLayout from './pages/AuthLayout';
import MainLayout from './pages/MainLayout';

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { i18n } = useTranslation('common');
  const [direction, setDirection] = useState('ltr');
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('authToken') ? true : false;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ||
      (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

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
    
    const handleStorageChange = () => {
      const currentTheme = localStorage.getItem('theme');
      setIsDarkMode(currentTheme === 'dark');
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLanguageChange = (value) => {
    i18n.changeLanguage(value);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <ConfigProvider
      direction={direction}
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#646cff',
        },
      }}
    >
      {isAuthenticated ? (
        <MainLayout
          direction={direction}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          currentPath={location.pathname}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          i18n={i18n}
          handleLanguageChange={handleLanguageChange}
          onLogout={handleLogout}
        />
      ) : (
        <AuthLayout
          direction={direction}
          isDarkMode={isDarkMode}
        />
      )}
    </ConfigProvider>
  );
};

export default App;