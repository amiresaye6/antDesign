// src/layouts/MainLayout.jsx
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Layout, theme } from 'antd';
import Navigation from '../components/Navigation';
import HeaderComponent from '../components/Header';
import Home from '../components/Home';
import OverView from '../components/Dashboards/OverView';
import ChannelsDashboard from '../components/Dashboards/ChannelsDashboard';
import AddWebsite from '../components/AddWebsite';
import UserManagement from '../components/Dashboards/userManagment';
import NotImplementedYet from '../components/NotImplementedYet';
import CampaignsDashboard from '../components/Dashboards/CampaignsDashboard';
import ChatWindow from '../components/ChatWindow';
import WebsiteManager from '../components/WebsiteManager';

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
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/channels-dashboard/:website-id" element={<ChannelsDashboard />} />
            <Route path="/add-website" element={<AddWebsite />} />
            <Route path="/campaigns" element={<CampaignsDashboard />} />
            <Route path="/crm" element={<NotImplementedYet />} />
            <Route path="/posts-dashboard" element={<NotImplementedYet />} />
            <Route path="/ai" element={<NotImplementedYet />} />
            <Route path="/chat/:chatid" element={<ChatWindow />} />
            <Route path="/manage-website/:websiteId" element={<WebsiteManager />} />

            {/* Catch-all route for any unmatched path */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;