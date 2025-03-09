import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Button, Flex, Select, Layout, ConfigProvider } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import enUS from 'antd/lib/locale/en_US';
import arEG from 'antd/lib/locale/ar_EG';

const { Header: AntHeader } = Layout;
const { Option } = Select;

const Header = () => {
  const { t, i18n } = useTranslation('common');
  const location = useLocation();
  const [direction, setDirection] = useState('ltr');
  const [locale, setLocale] = useState(enUS);

  useEffect(() => {
    if (i18n.language === 'ar') {
      setDirection('rtl');
      setLocale(arEG);
    } else {
      setDirection('ltr');
      setLocale(enUS);
    }
  }, [i18n.language]);

  const handleLanguageChange = (value) => {
    i18n.changeLanguage(value);
  };

  return (
    <ConfigProvider locale={locale} direction={direction}>
      <AntHeader
        style={{
          background: 'linear-gradient(135deg, #2DD4BF 0%, #F0FDFA 100%)', // Teal to off-white gradient
          padding: '0 40px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          height: '64px',
        }}
      >
        <Flex justify="space-between" align="center" style={{ height: '100%' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div
              style={{
                fontSize: '22px',
                fontWeight: '600',
                color: '#0F766E', // Dark teal
                fontFamily: "'Inter', sans-serif", // Clean, modern font
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#F97316')} // Orange hover
              onMouseLeave={(e) => (e.target.style.color = '#0F766E')}
            >
              OmniFlow
            </div>
          </Link>

          {/* Navigation Buttons */}
          <Flex gap="middle">
            <Link to="/login">
              <Button
                type="text"
                style={{
                  color: location.pathname === '/login' ? '#5EEAD4' : '#0F766E', // Highlight active page
                  fontWeight: '500',
                  fontSize: '16px',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#5EEAD4';
                  e.target.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color =
                    location.pathname === '/login' ? '#5EEAD4' : '#0F766E';
                }}
              >
                {t('login')}
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                type="text"
                style={{
                  color: location.pathname === '/signup' ? '#5EEAD4' : '#0F766E',
                  fontWeight: '500',
                  fontSize: '16px',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#5EEAD4';
                  e.target.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color =
                    location.pathname === '/signup' ? '#5EEAD4' : '#0F766E';
                }}
              >
                {t('signup')}
              </Button>
            </Link>
          </Flex>

          {/* Language Selector */}
          <Select
            value={i18n.language}
            onChange={handleLanguageChange}
            style={{
              width: 110,
              color: '#0F766E',
              fontWeight: '500',
            }}
            suffixIcon={<GlobalOutlined style={{ color: '#0F766E' }} />}
            dropdownStyle={{ minWidth: 110 }}
            popupMatchSelectWidth={false}
          >
            <Option value="en">English</Option>
            <Option value="ar">العربية</Option>
          </Select>
        </Flex>
      </AntHeader>
    </ConfigProvider>
  );
};

export default Header;