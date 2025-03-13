import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Typography,
  Space,
  Table,
  Progress,
  List,
  Avatar,
  DatePicker,
  Button,
  Badge
} from 'antd';
import {
  UserOutlined,
  MessageOutlined,
  RiseOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  BellOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Line } from '@ant-design/charts';

// Custom icons for different channels
import {
  FacebookOutlined,
  InstagramOutlined,
  WhatsAppOutlined,
  TwitterOutlined,
} from '@ant-design/icons';

// Custom TikTok icon since it's not in Ant Design icons
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
  </svg>
);

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;

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

const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
    case 'in progress':
      return <SyncOutlined style={{ color: '#1890ff' }} spin />;
    case 'failed':
      return <CloseCircleOutlined style={{ color: '#f5222d' }} />;
    default:
      return <ClockCircleOutlined style={{ color: '#faad14' }} />;
  }
};

const OverView = () => {
  const { t } = useTranslation('overview'); // Updated to 'OverView' namespace
  // eslint-disable-next-line no-unused-vars
  const [range, setRange] = useState([null, null]);

  // Sample data for metrics
  const metrics = {
    totalUsers: 12853,
    activeUsers: 5621,
    totalMessages: 45923,
    responseRate: 94.7,
    averageResponseTime: '2.3 hours', // Could be translated if dynamic
    newConversations: 127,
    userGrowth: 8.4,
    messageGrowth: 12.6
  };

  // Sample data for channel breakdown
  const channelData = [
    { channel: 'WhatsApp', count: 18734, percentage: 40.8 },
    { channel: 'Facebook', count: 12467, percentage: 27.1 },
    { channel: 'Instagram', count: 7823, percentage: 17.0 },
    { channel: 'X', count: 4213, percentage: 9.2 },
    { channel: 'TikTok', count: 2686, percentage: 5.9 }
  ];

  // Sample data for recent activities
  const recentActivities = [
    {
      id: 1,
      user: 'Sarah Johnson',
      action: t('activityActions.repliedToCustomerInquiry'),
      channel: 'WhatsApp',
      timestamp: '10 minutes ago' // Could be translated if dynamic
    },
    {
      id: 2,
      user: 'Michael Chen',
      action: t('activityActions.createdNewUserAccount'),
      channel: 'System',
      timestamp: '43 minutes ago'
    },
    {
      id: 3,
      user: 'Amanda Garcia',
      action: t('activityActions.resolvedCustomerComplaint'),
      channel: 'Facebook',
      timestamp: '1 hour ago'
    },
    {
      id: 4,
      user: 'Robert Kim',
      action: t('activityActions.updatedCampaignSettings'),
      channel: 'Instagram',
      timestamp: '2 hours ago'
    },
    {
      id: 5,
      user: 'Jessica Taylor',
      action: t('activityActions.generatedMonthlyReport'),
      channel: 'System',
      timestamp: '3 hours ago'
    }
  ];

  // Sample data for pending tasks
  const pendingTasks = [
    {
      id: 1,
      title: t('taskTitles.respondToCustomerComplaints'),
      priority: t('priorities.high'),
      deadline: t('deadlines.today'),
      status: t('statuses.inProgress')
    },
    {
      id: 2,
      title: t('taskTitles.updateSocialMediaContent'),
      priority: t('priorities.medium'),
      deadline: t('deadlines.tomorrow'),
      status: t('statuses.pending')
    },
    {
      id: 3,
      title: t('taskTitles.reviewChannelMetrics'),
      priority: t('priorities.low'),
      deadline: 'Mar 12, 2025', // Static date, not translated
      status: t('statuses.notStarted')
    }
  ];

  // Sample data for message trend
  const messageData = [
    { date: '2025-03-01', messages: 1423 },
    { date: '2025-03-02', messages: 1547 },
    { date: '2025-03-03', messages: 1689 },
    { date: '2025-03-04', messages: 1432 },
    { date: '2025-03-05', messages: 1276 },
    { date: '2025-03-06', messages: 1893 },
    { date: '2025-03-07', messages: 2045 },
    { date: '2025-03-08', messages: 1678 },
    { date: '2025-03-09', messages: 1532 }
  ];

  const config = {
    data: messageData,
    xField: 'date',
    yField: 'messages',
    point: {
      size: 5,
      shape: 'circle',
    },
    color: '#646cff',
    smooth: true,
  };

  // Priority color mapping
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case t('priorities.high').toLowerCase():
        return 'red';
      case t('priorities.medium').toLowerCase():
        return 'orange';
      case t('priorities.low').toLowerCase():
        return 'blue';
      default:
        return 'default';
    }
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} md={16}>
          <Title level={2}>{t('dashboardOverview')}</Title>
          <Paragraph>
            {t('welcomeMessage')}{' '}
            <Text strong>{new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</Text>
          </Paragraph>
        </Col>
        <Col xs={24} md={8} style={{ textAlign: 'right' }}>
          <Space>
            <RangePicker
              onChange={(values) => setRange(values)}
              allowClear
              placeholder={[t('startDate'), t('endDate')]}
            />
            <Button type="primary">
              {t('applyFilter')}
            </Button>
          </Space>
        </Col>
      </Row>

      {/* Key metrics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('totalUsers')}
              value={metrics.totalUsers}
              prefix={<UserOutlined />}
              suffix={
                <Text type="success">
                  <RiseOutlined /> {metrics.userGrowth}%
                </Text>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('activeUsers')}
              value={metrics.activeUsers}
              prefix={<TeamOutlined />}
              suffix={
                <Text type="secondary">
                  {Math.round((metrics.activeUsers / metrics.totalUsers) * 100)}%
                </Text>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('totalMessages')}
              value={metrics.totalMessages}
              prefix={<MessageOutlined />}
              suffix={
                <Text type="success">
                  <RiseOutlined /> {metrics.messageGrowth}%
                </Text>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('newConversations')}
              value={metrics.newConversations}
              prefix={<BellOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts and tables */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title={t('messageVolumeTrend')}>
            <Line {...config} height={350} style={{color: "white"}} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title={t('channelBreakdown')} style={{ height: '100%' }}>
            <List
              dataSource={channelData}
              renderItem={item => (
                <List.Item>
                  <Space style={{ width: '100%' }}>
                    <Avatar icon={getChannelIcon(item.channel)} />
                    <Text>{item.channel}</Text>
                    <div style={{ flex: 1 }}>
                      <Progress
                        percent={item.percentage}
                        size="small"
                        status="active"
                        showInfo={false}
                      />
                    </div>
                    <Text>{item.count.toLocaleString()}</Text>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent activities and tasks */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title={t('recentActivities')} extra={<a href="#">{t('viewAll')}</a>}>
            <List
              dataSource={recentActivities}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={
                      <Space>
                        <Text strong>{item.user}</Text>
                        {item.channel !== 'System' && (
                          <Avatar size="small" icon={getChannelIcon(item.channel)} />
                        )}
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size={0}>
                        <Text>{item.action}</Text>
                        <Text type="secondary">
                          <ClockCircleOutlined style={{ marginRight: 8 }} />
                          {item.timestamp}
                        </Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title={t('pendingTasks')} extra={<a href="#">{t('viewAll')}</a>}>
            <List
              dataSource={pendingTasks}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button type="link" size="small">{t('start')}</Button>,
                    <Button type="link" size="small">{t('assign')}</Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Badge
                        dot
                        color={getPriorityColor(item.priority)}
                        offset={[0, 5]}
                      >
                        <Avatar icon={getStatusIcon(item.status)} />
                      </Badge>
                    }
                    title={
                      <Space>
                        <Text strong>{item.title}</Text>
                        <Badge
                          color={getPriorityColor(item.priority)}
                          text={item.priority}
                        />
                      </Space>
                    }
                    description={
                      <Space>
                        <CalendarOutlined />
                        <Text type={item.deadline === t('deadlines.today') ? 'danger' : 'secondary'}>
                          {t('deadlines.due')} {item.deadline}
                        </Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Response metrics */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card title={t('responseMetrics')}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Statistic
                  title={t('responseRate')}
                  value={metrics.responseRate}
                  suffix="%"
                  valueStyle={{ color: '#3f8600' }}
                />
                <Progress
                  percent={metrics.responseRate}
                  status="active"
                  strokeColor={{
                    from: '#108ee9',
                    to: '#87d068'
                  }}
                />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic
                  title={t('averageResponseTime')}
                  value={metrics.averageResponseTime}
                  valueStyle={{ color: '#1890ff' }}
                />
                <div style={{ marginTop: 16 }}>
                  <Text>
                    <ClockCircleOutlined style={{ marginRight: 8 }} />
                    {t('responseTimeTarget')}
                  </Text>
                </div>
              </Col>
              <Col xs={24} sm={8}>
                <Statistic
                  title={t('customerSatisfaction')}
                  value={92.3}
                  suffix="%"
                  valueStyle={{ color: '#3f8600' }}
                />
                <Progress
                  percent={92.3}
                  status="active"
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Space>
  );
};

export default OverView;