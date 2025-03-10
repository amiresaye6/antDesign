import React, { useState, useEffect } from 'react';
import { Button, Space, ConfigProvider, theme } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';

const ThemeToggle = () => {
  // Use localStorage to persist theme preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || 
      (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    // Apply theme to document body for global styling
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Define algorithm based on current theme
  const algorithm = isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm;

  return (
    <ConfigProvider
      theme={{
        algorithm: algorithm,
      }}
    >
      <div className="theme-toggle-container" style={{ padding: '16px' }}>
        <Space>
          <Button 
            type="primary" 
            icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />} 
            onClick={toggleTheme}
          >
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </Button>
          
          {/* Example components to show theme changes */}
          <Button>Regular Button</Button>
        </Space>
      </div>
    </ConfigProvider>
  );
};

export default ThemeToggle;