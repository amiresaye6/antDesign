// App.js
import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import LoginCard from './components/loginCard';
import SignupCard from './components/SignupCard';
import ForgotPasswordCard from './components/ForgotPasswordCard';
import { Layout, theme, ConfigProvider } from 'antd';
import { useTranslation } from 'react-i18next';
import ChannelsDashboard from './components/ChannelsDashboard';
import Home from './components/Home';
import OverView from './components/OverView';
import Navigation from './components/Navigation';
import HeaderComponent from './components/Header';
import UserManagement from './pages/usersPage';

const { Content } = Layout;


const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { i18n } = useTranslation('common');
  const [direction, setDirection] = useState('ltr');
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ||
      (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const { token } = theme.useToken();

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
      <Layout style={{ minHeight: '100vh', direction }}>
        <Navigation 
          collapsed={collapsed} 
          setCollapsed={setCollapsed} 
          currentPath={location.pathname}
        />
        <Layout className={`site-layout ${collapsed ? 'collapsed' : ''}`}>
          <HeaderComponent
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
            i18n={i18n}
            handleLanguageChange={handleLanguageChange}
            token={token}
          />
          <Content style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: isDarkMode ? '#121212' : token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
            transition: 'background-color 0.3s'
          }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/overview" element={<OverView />} />
              <Route path="/channels-dashboard" element={<ChannelsDashboard />} />
              <Route path="/posting-dashboard" element={<ChannelsDashboard />} />
              <Route path="/login" element={<LoginCard />} />
              <Route path="/signup" element={<SignupCard />} />
              <Route path="/forgotPassword" element={<ForgotPasswordCard />} />
              <Route path="/user-management" element={<UserManagement />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;