import React, { useState, useEffect } from 'react';
import { Dropdown, Badge, Space, Typography, Button } from 'antd';
import { ClockCircleOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const UserStatusTimer = () => {

  const { t } = useTranslation('userStatusTimer');

  // States
  const [status, setStatus] = useState('active');
  const [timeSpent, setTimeSpent] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Status options with their configurations
  const statusOptions = {
    active: { color: 'green', label: t('statuses.active') },
    break: { color: 'orange', label: t('statuses.break') },
    meeting: { color: 'blue', label: t('statuses.meeting') },
    busy: { color: 'red', label: t('statuses.busy') },
    away: { color: 'gray', label: t('statuses.away') }
  };

  // Format seconds into HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');
  };

  // Timer effect
  useEffect(() => {
    let interval = null;
    
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimeSpent((prevTime) => prevTime + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isTimerRunning]);
  
  // Effect to save status and time to localStorage
  useEffect(() => {
    const savedTime = localStorage.getItem('userTimeSpent');
    const savedStatus = localStorage.getItem('userStatus');
    
    if (savedTime) {
      setTimeSpent(parseInt(savedTime, 10));
    }
    
    if (savedStatus && statusOptions[savedStatus]) {
      setStatus(savedStatus);
    }
    
    // Save current values on unmount
    return () => {
      localStorage.setItem('userTimeSpent', timeSpent.toString());
      localStorage.setItem('userStatus', status);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Save periodically
  useEffect(() => {
    const saveInterval = setInterval(() => {
      localStorage.setItem('userTimeSpent', timeSpent.toString());
      localStorage.setItem('userStatus', status);
    }, 10000); // Save every 10 seconds
    
    return () => clearInterval(saveInterval);
  }, [timeSpent, status]);
  
  // Handle status change
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setIsTimerRunning(newStatus === 'active');
    setDropdownOpen(false);
  };
  
  // Reset timer
  const handleResetTimer = (e) => {
    e.stopPropagation();
    setTimeSpent(0);
  };
  
  // Dropdown menu items
  const items = Object.entries(statusOptions).map(([key, { label }]) => ({
    key,
    label: (
      <Space>
        <Badge color={statusOptions[key].color} />
        <span>{label}</span>
      </Space>
    ),
    onClick: () => handleStatusChange(key)
  }));
  
  // Add reset timer option
  items.push({
    key: 'divider',
    type: 'divider'
  });
  
  items.push({
    key: 'reset',
    label: (
      <Button type="text" size="small" onClick={handleResetTimer}>
        {t('timer.reset')}
      </Button>
    )
  });

  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
      open={dropdownOpen}
      onOpenChange={setDropdownOpen}
    >
      <Space 
        style={{ 
          cursor: 'pointer', 
          padding: '4px 12px',
          border: '1px solid #d9d9d9',
          borderRadius: '6px'
        }}
      >
        <Badge color={statusOptions[status].color} />
        <Typography.Text>{statusOptions[status].label}</Typography.Text>
        <ClockCircleOutlined />
        <Typography.Text>{formatTime(timeSpent)}</Typography.Text>
        <CaretDownOutlined />
      </Space>
    </Dropdown>
  );
};

export default UserStatusTimer;