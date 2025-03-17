import React, { useState, useEffect } from 'react';
import { Button, Modal, Space, Switch, Dropdown, Drawer } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SunOutlined,
  MoonOutlined,
  GlobalOutlined,
  LogoutOutlined,
  MoreOutlined
} from '@ant-design/icons';
import UserStatusTimer from './UserStatusTimer';

const HeaderComponent = ({
  collapsed,
  setCollapsed,
  isDarkMode,
  toggleTheme,
  i18n,
  handleLanguageChange,
  token
}) => {
  const [mobileView, setMobileView] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if it's mobile view
  useEffect(() => {
    const checkMobileView = () => {
      setMobileView(window.innerWidth < 768);
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);

    return () => {
      window.removeEventListener('resize', checkMobileView);
    };
  }, []);

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

  // Regular desktop header content
  const headerContent = (
    <Space align="center" size="middle">
      <UserStatusTimer />
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
  );

  return (
    <>
      <header style={{
        padding: '0 16px',
        background: isDarkMode ? '#1f1f1f' : token.colorBgContainer,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        height: 64,
        zIndex: 1000,
        position: 'relative'
      }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{ fontSize: '16px', width: 64, height: 64 }}
        />

        {/* Show full header content on desktop, dropdown trigger on mobile */}
        {mobileView ? (
          <Button
            type="text"
            icon={<MoreOutlined />}
            onClick={() => setMobileMenuOpen(true)}
            style={{ fontSize: '18px' }}
          />
        ) : (
          headerContent
        )}
      </header>

      {/* Mobile drawer with blur overlay */}
      {mobileView && (
        <Drawer
          title="Menu"
          placement={i18n.language === 'ar' ? 'right' : 'left'}
          onClose={() => setMobileMenuOpen(false)}
          open={mobileMenuOpen}
          bodyStyle={{ padding: '12px' }}
          maskStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(4px)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <UserStatusTimer />
            <div>
              <div style={{ marginBottom: '8px' }}>Theme</div>
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
            </div>
            <div>
              <div style={{ marginBottom: '8px' }}>Language</div>
              <Space>
                <GlobalOutlined />
                <Button
                  type={i18n.language === 'en' ? 'primary' : 'default'}
                  size="small"
                  onClick={() => {
                    handleLanguageChange('en');
                    setMobileMenuOpen(false);
                  }}
                >
                  EN
                </Button>
                <Button
                  type={i18n.language === 'ar' ? 'primary' : 'default'}
                  size="small"
                  onClick={() => {
                    handleLanguageChange('ar');
                    setMobileMenuOpen(false);
                  }}
                >
                  AR
                </Button>
              </Space>
            </div>
            <Button
              type="primary"
              danger
              onClick={() => {
                handleLogOut();
                setMobileMenuOpen(false);
              }}
            >
              <LogoutOutlined /> Logout
            </Button>
          </div>
        </Drawer>
      )}
    </>
  );
};

export default HeaderComponent;