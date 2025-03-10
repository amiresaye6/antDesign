import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Layout,
  Menu,
  Select,
  Button,
  Drawer,
  Space,
  Switch,
  Typography
} from 'antd';
import {
  GlobalOutlined,
  HomeOutlined,
  DashboardOutlined,
  LoginOutlined,
  UserAddOutlined,
  MenuOutlined,
  SunOutlined,
  MoonOutlined
} from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const { Option } = Select;
const { Title } = Typography;

const Header = ({ onThemeChange, isDarkMode }) => {
  const [mobileVisible, setMobileVisible] = useState(false);
  const { t, i18n } = useTranslation('common');
  const [direction, setDirection] = useState('ltr');
  const location = useLocation();

  useEffect(() => {
    setDirection(i18n.language === 'ar' ? 'rtl' : 'ltr');
  }, [i18n.language]);

  const handleLanguageChange = (value) => {
    i18n.changeLanguage(value);
  };

  const toggleTheme = () => {
    onThemeChange(!isDarkMode);
  };

  // Define menu items
  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">{t('home')}</Link>,
    },
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">{t('dashboard')}</Link>,
    },
    {
      key: '/login',
      icon: <LoginOutlined />,
      label: <Link to="/login">{t('login')}</Link>,
    },
    {
      key: '/signup',
      icon: <UserAddOutlined />,
      label: <Link to="/signup">{t('signup')}</Link>,
    },
  ];

  return (
    <AntHeader
      style={{
        background: isDarkMode ? '#1f1f1f' : '#fff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        height: 64,
        direction
      }}
    >
      {/* Logo */}
      <Title
        level={4}
        style={{
          margin: 0,
          color: '#646cff',
          fontWeight: 'bold'
        }}
      >
        OmniFlow
      </Title>

      {/* Desktop Navigation */}
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        style={{
          background: 'transparent',
          borderBottom: 'none',
          flex: 1,
          justifyContent: 'center',
          display: { xs: 'none', md: 'flex' }
        }}
        items={menuItems}
      />

      {/* Right section with theme toggle, language selector and mobile menu button */}
      <Space align="center">
        {/* Theme Toggle Switch */}
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

        {/* Language Selector */}
        <Select
          value={i18n.language}
          onChange={handleLanguageChange}
          style={{ width: 110 }}
          suffixIcon={<GlobalOutlined />}
        >
          <Option value="en">English</Option>
          <Option value="ar">العربية</Option>
        </Select>

        {/* Mobile Menu Button */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setMobileVisible(true)}
          style={{ display: { xs: 'block', md: 'none' } }}
        />
      </Space>

      {/* Mobile Navigation Drawer */}
      <Drawer
        title="Menu"
        placement={direction === 'rtl' ? 'right' : 'left'}
        onClose={() => setMobileVisible(false)}
        open={mobileVisible}
        width={250}
      >
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          style={{ border: 'none' }}
          items={menuItems}
          onClick={() => setMobileVisible(false)}
        />
      </Drawer>
    </AntHeader>
  );
};

export default Header;