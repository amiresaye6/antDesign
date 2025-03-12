// src/layouts/MainLayout.jsx
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Layout, theme } from 'antd';
import Navigation from '../components/Navigation';
import HeaderComponent from '../components/Header';
import Home from '../components/Home';
import OverView from '../components/OverView';
import ChannelsDashboard from '../components/ChannelsDashboard';

const { Content } = Layout;

const MainLayout = ({
  direction,
  collapsed,
  setCollapsed,
  currentPath,
  isDarkMode,
  toggleTheme,
  i18n,
  handleLanguageChange,
  onLogout
}) => {
  const { token } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh', direction }}>
      <Navigation
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        currentPath={currentPath}
        onLogout={onLogout}
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
          onLogout={onLogout}
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;