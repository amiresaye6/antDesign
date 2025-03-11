import React from 'react';
import { Card, Row, Col, Button, Space, Typography } from 'antd';
import { CoffeeOutlined } from '@ant-design/icons'; // Using as temporary tea icon
// import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const Home = () => {
  // const { t } = useTranslation('common');

  // Sample button data - you can modify these later
  const actions = [
    {
      id: 1,
      name: 'Medipix',
      icon: <CoffeeOutlined style={{ fontSize: '20px' }} />,
      link: '/campaigns/create', // Future route
    },
    {
      id: 2,
      name: 'Ivita',
      icon: <CoffeeOutlined style={{ fontSize: '20px' }} />,
      link: '/users/manage', // Future route
    },
    {
      id: 3,
      name: '3A lab',
      icon: <CoffeeOutlined style={{ fontSize: '20px' }} />,
      link: '/reports', // Future route
    },
    {
      id: 4,
      name: 'OmniFlow',
      icon: <CoffeeOutlined style={{ fontSize: '20px' }} />,
      link: '/settings', // Future route
    },
  ];

  return (
    <Card title="Quick Actions" style={{ width: '100%' }}>
      <Row gutter={[16, 16]}>
        {actions.map((action) => (
          <Col xs={24} sm={12} md={6} key={action.id}>
            <Link to="/dashboard">
            <Button
              type="primary"
              block
              size="large"
              style={{
                height: '100px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.3s',
              }}
              // In the future, add: onClick={() => navigate(action.link)}
            >
              <Space direction="vertical" size="middle">
                {action.icon}
                <Text strong style={{ color: '#fff', fontSize: '16px' }}>
                  {action.name}
                </Text>
              </Space>
            </Button>
            </Link>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default Home;