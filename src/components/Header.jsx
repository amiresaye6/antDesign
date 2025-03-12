// HeaderComponent.js
import React from 'react';
import { Button, Modal, Space, Switch } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SunOutlined,
  MoonOutlined,
  GlobalOutlined,
  LogoutOutlined
} from '@ant-design/icons';

const HeaderComponent = ({
  collapsed,
  setCollapsed,
  isDarkMode,
  toggleTheme,
  i18n,
  handleLanguageChange,
  token
}) => {
  const handleLogOut = () => {
    Modal.confirm({
      title: 'Confirm Logout',
      content: 'Are you sure you want to log out?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
    });
  };

  return (
    <header style={{
      padding: '0 16px',
      background: isDarkMode ? '#1f1f1f' : token.colorBgContainer,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
      height: 64
    }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{ fontSize: '16px', width: 64, height: 64 }}
      />
      <Space align="center" size="middle">
        <Space>
          <SunOutlined style={{ color: isDarkMode ? 'rgba(255,255,255,0.65)' : '#faad14' }} />
          <Switch
            checked={isDarkMode}
            onChange={toggleTheme}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
          <MoonOutlined style={{ color: isDarkMode ? '#177ddc' : 'rgba(0,0,0,0.45)' }} />
        </Space>
        <Space>
          <GlobalOutlined />
          <Button
            type={i18n.language === 'en' ? 'primary' : 'default'}
            size="small"
            onClick={() => handleLanguageChange('en')}
          >
            EN
          </Button>
          <Button
            type={i18n.language === 'ar' ? 'primary' : 'default'}
            size="small"
            onClick={() => handleLanguageChange('ar')}
          >
            AR
          </Button>
          <Button
            type="default"
            size="small"
            onClick={handleLogOut}
          >
            <LogoutOutlined />
          </Button>
        </Space>
      </Space>
    </header>
  );
};

export default HeaderComponent;