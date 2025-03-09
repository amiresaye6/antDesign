import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import './Header.css';

const { Option } = Select;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation('common');
  const [direction, setDirection] = useState('ltr');

  useEffect(() => {
    setDirection(i18n.language === 'ar' ? 'rtl' : 'ltr');
  }, [i18n.language]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguageChange = (value) => {
    i18n.changeLanguage(value);
  };

  return (
    <header className="header" style={{ direction }}>
      <div className="logo">OmniFlow</div>
      <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/">{t('home')}</Link></li>
          <li><Link to="/dashboard">{t('dashboard')}</Link></li>
          <li><Link to="/login">{t('login')}</Link></li>
          <li><Link to="/signup">{t('signup')}</Link></li>
        </ul>
      </nav>
      <div className="header-right">
        <Select
          value={i18n.language}
          onChange={handleLanguageChange}
          style={{ width: 110 }}
          suffixIcon={<GlobalOutlined />}
        >
          <Option value="en">English</Option>
          <Option value="ar">العربية</Option>
        </Select>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
