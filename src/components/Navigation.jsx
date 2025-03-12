// Navigation.js
import React from 'react';
import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Typography from 'antd/es/typography/Typography';
import {
  HomeOutlined,
  UserOutlined,
  DashboardOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
  MailOutlined,
  ContactsOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const Navigation = ({ collapsed, setCollapsed, currentPath }) => {
  const { t } = useTranslation('common');
  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">{t('home')}</Link>,
    },
    {
      key: '/user-management',
      icon: <UserOutlined />,
      label: <Link to="/user-management">{t('userManagement')}</Link>,
    },
    {
      key: '/channels-dashboard',
      icon: <AppstoreOutlined />,
      label: <Link to="/channels-dashboard">{t('channelsDashboard')}</Link>,
    },
    {
      key: '/posts-dashboard',
      icon: <FileTextOutlined />,
      label: <Link to="/posts-dashboard">{t('postsDashboard')}</Link>,
    },
    {
      key: '/campaigns',
      icon: <MailOutlined />, // Represents marketing/email campaigns
      label: <Link to="/campaigns">{t('campaigns')}</Link>,
    },
    {
      key: '/crm',
      icon: <ContactsOutlined />, // Represents customer contacts/data
      label: <Link to="/crm">{t('crm')}</Link>,
    },
    {
      key: '/overview',
      icon: <DashboardOutlined />,
      label: <Link to="/overview">{t('overview')}</Link>,
    },
    // {
    //   key: '/login',
    //   icon: <LoginOutlined />,
    //   label: <Link to="/login">{t('login')}</Link>,
    // },
    // {
    //   key: '/signup',
    //   icon: <UserAddOutlined />,
    //   label: <Link to="/signup">{t('signup')}</Link>,
    // },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      width={200}
      collapsedWidth={80} // Increased from 0 to show icons when collapsed
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh', // Full viewport height
        zIndex: 1000,
        backgroundColor: 'var(--component-background)', // Matches your global CSS
        borderRight: '1px solid var(--border-color)',
        overflowY: 'auto', // Allows scrolling within sider if content overflows
      }}
      onBreakpoint={(broken) => {
        if (broken) {
          setCollapsed(true);
        }
      }}
    >
      <div style={{
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'center',
        backgroundColor: 'var(--component-background)',
        borderBottom: '1px solid var(--border-color)',
      }}>
        <Typography.Title
          level={4}
          style={{
            margin: 0,
            color: 'var(--text-color)', // Matches your global CSS
            textAlign: 'center',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: collapsed ? 16 : 20,
          }}
        >
          OmniFlow
          {/* {collapsed ? 'OF' : 'OmniFlow'} */}
        </Typography.Title>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[currentPath]}
        items={menuItems}
        style={{
          backgroundColor: 'var(--component-background)',
          borderRight: 'none',
          color: 'var(--text-color)',
        }}
        theme="light" // Changed from 'dark' to 'light' to use our custom colors
        defaultOpenKeys={['sub1']}
        // Custom styles for menu items
        className="custom-navigation-menu"
      />
    </Sider>
  );
};

export default Navigation;