import React, { useState } from 'react';
import {
  Table,
  Tag,
  Space,
  Typography,
  Card,
  Row,
  Col,
  Dropdown,
  Button,
  Avatar,
  Rate,
  Input,
  Select,
  Statistic
} from 'antd';
import {
  FacebookOutlined,
  InstagramOutlined,
  WhatsAppOutlined,
  TwitterOutlined,
  MoreOutlined,
  UserOutlined,
  ClockCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

// Custom TikTok icon since it's not in Ant Design icons
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
  </svg>
);

// Get channel icon based on channel name
const getChannelIcon = (channel) => {
  const iconStyle = { fontSize: '18px' };

  switch (channel.toLowerCase()) {
    case 'facebook':
      return <FacebookOutlined style={{ ...iconStyle, color: '#1877F2' }} />;
    case 'instagram':
      return <InstagramOutlined style={{ ...iconStyle, color: '#E4405F' }} />;
    case 'whatsapp':
      return <WhatsAppOutlined style={{ ...iconStyle, color: '#25D366' }} />;
    case 'x':
    case 'twitter':
      return <TwitterOutlined style={{ ...iconStyle, color: '#1DA1F2' }} />;
    case 'tiktok':
      return <span style={{ ...iconStyle, color: '#000000' }}><TikTokIcon /></span>;
    default:
      return <MessageOutlined style={iconStyle} />;
  }
};

// Get status color
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'new':
    case 'جديد':
      return 'blue';
    case 'active':
    case 'نشط':
      return 'green';
    case 'pending':
    case 'قيد الانتظار':
      return 'orange';
    case 'resolved':
    case 'تم الحل':
      return 'green';
    case 'closed':
    case 'مغلق':
      return 'gray';
    default:
      return 'default';
  }
};

// Generate timestamp
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;

  // Less than a day
  if (diff < 86400000) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
  }

  // Less than a week
  if (diff < 604800000) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  }

  // More than a week
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

// Test data
const testData = [
  {
    id: '1',
    channel: 'Facebook',
    name: 'John Smith',
    mobile: '+1 (555) 123-4567',
    email: 'john.smith@example.com',
    message: 'I have a question about your product pricing options. Can you help me with a detailed quote?',
    timestamp: new Date('2025-03-08T14:30:00').getTime(),
    status: 'New',
    rating: 0, // No rating yet
  },
  {
    id: '2',
    channel: 'WhatsApp',
    name: 'Maria Rodriguez',
    mobile: '+1 (555) 987-6543',
    email: 'maria.r@example.com',
    message: 'The delivery has been delayed for over a week now. Please provide an update ASAP.',
    timestamp: new Date('2025-03-07T09:15:00').getTime(),
    status: 'Active',
    rating: 3,
  },
  {
    id: '3',
    channel: 'Instagram',
    name: 'David Chen',
    mobile: '+1 (555) 456-7890',
    email: 'dchen@example.com',
    message: 'Thank you for resolving my issue so quickly! The new product works perfectly.',
    timestamp: new Date('2025-03-05T16:45:00').getTime(),
    status: 'Resolved',
    rating: 5,
  },
  {
    id: '4',
    channel: 'TikTok',
    name: 'Priya Sharma',
    mobile: '+1 (555) 234-5678',
    email: 'priya.s@example.com',
    message: 'I saw your latest post and would like to collaborate on a marketing campaign.',
    timestamp: new Date('2025-03-09T11:20:00').getTime(),
    status: 'New',
    rating: 0,
  },
  {
    id: '5',
    channel: 'X',
    name: 'Alex Johnson',
    mobile: '+1 (555) 789-0123',
    email: 'a.johnson@example.com',
    message: 'Your customer service team has been unresponsive for days. I need this resolved now.',
    timestamp: new Date('2025-03-06T13:10:00').getTime(),
    status: 'Pending',
    rating: 1,
  },
];

const ChannelDashboard = () => {
  const { t } = useTranslation('messagesDashboard');
  const [data, setData] = useState(testData);
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedChannel, setSelectedChannel] = useState('All');

  // More actions menu items
  const moreActions = () => [
    {
      key: 'assign',
      label: t('assignToAgent'),
    },
    {
      key: 'archive',
      label: t('archiveConversation'),
    },
    {
      key: 'block',
      label: t('blockUser'),
      danger: true,
    },
  ];

  // Filter data based on search and filters
  const filteredData = data.filter(item => {
    const matchesSearch = searchText === '' ||
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.message.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase()) ||
      item.mobile.includes(searchText);

    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    const matchesChannel = selectedChannel === 'All' || item.channel === selectedChannel;

    return matchesSearch && matchesStatus && matchesChannel;
  });

  // Handle rating change
  const handleRatingChange = (value, record) => {
    const newData = [...data];
    const index = newData.findIndex(item => item.id === record.id);
    newData[index].rating = value;
    setData(newData);
  };

  // Table columns
  const columns = [
    {
      title: t('channel'),
      dataIndex: 'channel',
      key: 'channel',
      width: 140,
      render: channel => (
        <Space>
          {getChannelIcon(channel)}
          <Text>{channel}</Text>
        </Space>
      ),
    },
    {
      title: t('contact'),
      dataIndex: 'name',
      key: 'name',
      width: 220,
      render: (_, record) => (
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Space>
            <Avatar icon={<UserOutlined />} />
            <Text strong>{record.name}</Text>
          </Space>
          <Space>
            <PhoneOutlined style={{ color: '#8c8c8c' }} />
            <Text type="secondary">{record.mobile}</Text>
          </Space>
          <Space>
            <MailOutlined style={{ color: '#8c8c8c' }} />
            <Text type="secondary">{record.email}</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: t('message'),
      dataIndex: 'message',
      key: 'message',
      render: (message, record) => (
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Text ellipsis={{ tooltip: message }} style={{ maxWidth: 400 }}>
            {message}
          </Text>
          <Space>
            <ClockCircleOutlined style={{ color: '#8c8c8c' }} />
            <Text type="secondary">{formatTime(record.timestamp)}</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: status => (
        <Tag color={getStatusColor(status)}>
          {t(status.toLowerCase())}
        </Tag>
      ),
    },
    {
      title: t('rating'),
      dataIndex: 'rating',
      key: 'rating',
      width: 180,
      render: (rating, record) => (
        <Rate
          disabled={false}
          value={rating}
          onChange={(value) => handleRatingChange(value, record)}
        />
      ),
    },
    {
      title: t('actions'),
      key: 'actions',
      width: 80,
      render: (_, record) => (
        <Dropdown menu={{ items: moreActions(record) }} placement="bottomRight">
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row gutter={24} align="middle">
          <Col xs={24} sm={12}>
            <Title level={4}>{t('dashboardTitle')}</Title>
          </Col>
          <Col xs={24} sm={12}>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Select
                defaultValue="All"
                style={{ width: 120 }}
                onChange={value => setSelectedChannel(value)}
              >
                <Option value="All">{t('allChannels')}</Option>
                <Option value="Facebook">Facebook</Option>
                <Option value="Instagram">Instagram</Option>
                <Option value="TikTok">TikTok</Option>
                <Option value="WhatsApp">WhatsApp</Option>
                <Option value="X">X</Option>
              </Select>
              <Select
                defaultValue="All"
                style={{ width: 120 }}
                onChange={value => setSelectedStatus(value)}
              >
                <Option value="All">{t('allStatus')}</Option>
                <Option value="New">{t('new')}</Option>
                <Option value="Active">{t('active')}</Option>
                <Option value="Pending">{t('pending')}</Option>
                <Option value="Resolved">{t('resolved')}</Option>
                <Option value="Closed">{t('closed')}</Option>
              </Select>
              <Search
                placeholder={t('searchPlaceholder')}
                allowClear
                onSearch={value => setSearchText(value)}
                onChange={e => setSearchText(e.target.value)}
                style={{ width: 250 }}
              />
            </Space>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Card>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Row gutter={16}>
                  <Col xs={12} sm={6}>
                    <Card size="small">
                      <Statistic title={t('total')} value={data.length} />
                    </Card>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Card size="small">
                      <Statistic title={t('new')} value={data.filter(item => item.status === 'New').length} />
                    </Card>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Card size="small">
                      <Statistic title={t('active')} value={data.filter(item => item.status === 'Active').length} />
                    </Card>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Card size="small">
                      <Statistic title={t('pending')} value={data.filter(item => item.status === 'Pending').length} />
                    </Card>
                  </Col>
                </Row>
              </Space>
            </Card>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
        />
      </Space>
    </>
  );
};

export default ChannelDashboard;