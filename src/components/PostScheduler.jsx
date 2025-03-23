// components/PostScheduler.js
import React, { useState } from 'react';
import { 
  Table, 
  Button, 
  Space, 
  Tag, 
  Typography, 
  Popconfirm, 
  Badge, 
  Empty 
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

const PostScheduler = () => {
  const { t } = useTranslation('postsDashboard');
  const [scheduledPosts, setScheduledPosts] = useState([
    {
      id: 1,
      content: 'New product launch coming soon! #excited',
      scheduledTime: '2025-03-15 14:30:00',
      platforms: ['facebook', 'instagram', 'twitter'],
      mediaType: 'image',
      status: 'pending'
    },
    {
      id: 2,
      content: 'Check out our behind-the-scenes video!',
      scheduledTime: '2025-03-17 10:00:00',
      platforms: ['youtube', 'facebook'],
      mediaType: 'video',
      status: 'pending'
    }
  ]);
  
  // Platform icons mapping
  const platformIcons = {
    facebook: { icon: 'FacebookOutlined', color: '#1877F2' },
    instagram: { icon: 'InstagramOutlined', color: '#E1306C' },
    twitter: { icon: 'TwitterOutlined', color: '#1DA1F2' },
    linkedin: { icon: 'LinkedinOutlined', color: '#0077B5' },
    youtube: { icon: 'YoutubeOutlined', color: '#FF0000' }
  };
  
  const handleDelete = (id) => {
    setScheduledPosts(scheduledPosts.filter(post => post.id !== id));
  };
  
  const columns = [
    {
      title: t('media'),
      dataIndex: 'mediaType',
      key: 'mediaType',
      render: (type) => (
        <Badge 
          status={type === 'image' ? 'success' : 'processing'} 
          text={type === 'image' ? t('image') : t('video')} 
        />
      )
    },
    {
      title: t('content'),
      dataIndex: 'content',
      key: 'content',
      render: (text) => <Text ellipsis={{ tooltip: text }}>{text}</Text>
    },
    {
      title: t('scheduledTime'),
      dataIndex: 'scheduledTime',
      key: 'scheduledTime',
      render: (time) => (
        <span>
          <ClockCircleOutlined style={{ marginRight: 8 }} />
          {time}
        </span>
      )
    },
    {
      title: t('platforms'),
      dataIndex: 'platforms',
      key: 'platforms',
      render: (platforms) => (
        <Space wrap>
          {platforms.map(platform => (
            <Tag 
              color={platformIcons[platform]?.color || 'default'} 
              key={platform}
            >
              {t(`platforms.${platform}.name`)}
            </Tag>
          ))}
        </Space>
      )
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          status={status === 'pending' ? 'warning' : 'success'} 
          text={status === 'pending' ? t('pending') : t('published')} 
        />
      )
    },
    {
      title: t('actions'),
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => console.log('Edit post', record.id)}
          />
          <Popconfirm
            title={t('confirmDelete')}
            onConfirm={() => handleDelete(record.id)}
            okText={t('yes')}
            cancelText={t('no')}
          >
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />} 
              size="small"
            />
          </Popconfirm>
        </Space>
      )
    }
  ];
  
  return (
    <div className="post-scheduler">
      {scheduledPosts.length > 0 ? (
        <Table 
          columns={columns}
          dataSource={scheduledPosts}
          rowKey="id"
          pagination={false}
        />
      ) : (
        <Empty description={t('noScheduledPosts')} />
      )}
    </div>
  );
};

export default PostScheduler;