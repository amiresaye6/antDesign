import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  Typography,
  Avatar,
  Space,
  Empty,
  Dropdown,
  Menu,
  Tag,
  Tooltip,
  Skeleton,
  Badge
} from 'antd';
import {
  PlusOutlined,
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
  GlobalOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  DashboardOutlined,
  LinkOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWebsites();
  }, []);

  const fetchWebsites = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockWebsites = [
        {
          id: 1,
          displayName: 'Medipix',
          websiteUrl: 'https://medipix.com',
          icon: 'https://media.istockphoto.com/id/1696167872/photo/aerial-view-of-forest-at-sunset-on-the-background-of-mountains-in-dolomites.jpg?s=612x612&w=0&k=20&c=TOMStt8moZZeljF3phyCioQXwYFrZBhY5-dsx-nMjDg=',
          channels: [
            { type: 'facebook', username: 'medipixofficial', profileUrl: 'https://facebook.com/medipixofficial' },
            { type: 'instagram', username: 'medipix', profileUrl: 'https://instagram.com/medipix' }
          ],
          status: 'active'
        },
        {
          id: 2,
          displayName: 'Ivita',
          websiteUrl: 'https://ivita.org',
          icon: 'https://media.istockphoto.com/id/1696167872/photo/aerial-view-of-forest-at-sunset-on-the-background-of-mountains-in-dolomites.jpg?s=612x612&w=0&k=20&c=TOMStt8moZZeljF3phyCioQXwYFrZBhY5-dsx-nMjDg=',
          channels: [
            { type: 'twitter', username: 'ivita_official', profileUrl: 'https://twitter.com/ivita_official' },
            { type: 'youtube', username: 'IvitaChannel', profileUrl: 'https://youtube.com/IvitaChannel' }
          ],
          status: 'active'
        },
        {
          id: 3,
          displayName: '3A Lab',
          websiteUrl: 'https://3alab.tech',
          icon: 'https://media.istockphoto.com/id/1696167872/photo/aerial-view-of-forest-at-sunset-on-the-background-of-mountains-in-dolomites.jpg?s=612x612&w=0&k=20&c=TOMStt8moZZeljF3phyCioQXwYFrZBhY5-dsx-nMjDg=',
          channels: [
            { type: 'facebook', username: '3alabofficial', profileUrl: 'https://facebook.com/3alabofficial' },
            { type: 'instagram', username: '3alab', profileUrl: 'https://instagram.com/3alab' },
            { type: 'twitter', username: '3alab_tech', profileUrl: 'https://twitter.com/3alab_tech' }
          ],
          status: 'maintenance'
        },
        {
          id: 4,
          displayName: 'OmniFlow',
          websiteUrl: 'https://omniflow.io',
          icon: 'https://media.istockphoto.com/id/1696167872/photo/aerial-view-of-forest-at-sunset-on-the-background-of-mountains-in-dolomites.jpg?s=612x612&w=0&k=20&c=TOMStt8moZZeljF3phyCioQXwYFrZBhY5-dsx-nMjDg=',
          channels: [
            { type: 'youtube', username: 'OmniFlowOfficial', profileUrl: 'https://youtube.com/OmniFlowOfficial' }
          ],
          status: 'active'
        }
      ];

      setWebsites(mockWebsites);
    } catch (error) {
      console.error('Error fetching websites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWebsite = (id) => {
    setWebsites(websites.filter(website => website.id !== id));
  };

  const getChannelIcon = (type) => {
    switch (type) {
      case 'facebook':
        return <FacebookOutlined style={{ color: '#1877F2' }} />;
      case 'twitter':
        return <TwitterOutlined style={{ color: '#1DA1F2' }} />;
      case 'instagram':
        return <InstagramOutlined style={{ color: '#E4405F' }} />;
      case 'youtube':
        return <YoutubeOutlined style={{ color: '#FF0000' }} />;
      default:
        return <GlobalOutlined />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge status="success" text="Active" />;
      case 'maintenance':
        return <Badge status="warning" text="Maintenance" />;
      case 'offline':
        return <Badge status="error" text="Offline" />;
      default:
        return <Badge status="default" text="Unknown" />;
    }
  };

  const getWebsiteDropdownMenu = (website) => (
    <Menu>
      <Menu.Item key="1" icon={<EditOutlined />} onClick={() => navigate(`/edit-website/${website.id}`)}>
        Edit
      </Menu.Item>
      <Menu.Item key="2" icon={<SettingOutlined />} onClick={() => navigate(`/website-settings/${website.id}`)}>
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" danger icon={<DeleteOutlined />} onClick={() => handleDeleteWebsite(website.id)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const renderSkeletonCards = () => {
    return Array(4).fill(null).map((_, index) => (
      <Col xs={24} sm={12} md={8} lg={6} key={`skeleton-${index}`}>
        <Card
          style={{
            height: '100%',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.06)',
            overflow: 'hidden',
            backgroundColor: 'var(--component-background)',
            borderColor: 'var(--border-color)'
          }}
        >
          <Skeleton.Image active style={{ width: '100%', height: 140 }} />
          <Skeleton active paragraph={{ rows: 2 }} />
          <div style={{ marginTop: 16 }}>
            <Skeleton.Button active size="small" style={{ width: 80, marginRight: 8 }} />
            <Skeleton.Button active size="small" style={{ width: 80, marginRight: 8 }} />
            <Skeleton.Button active size="small" style={{ width: 80 }} />
          </div>
        </Card>
      </Col>
    ));
  };

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '32px',
        alignItems: 'center',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '16px'
      }}>
        <Title level={2} style={{ margin: 0, color: 'var(--text-color)' }}>My Websites</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/add-website')}
          size="large"
          style={{
            borderRadius: '6px',
            height: '40px',
            fontWeight: 500,
            backgroundColor: 'var(--primary-color)',
            borderColor: 'var(--primary-color)',
            transition: 'all 0.3s'
          }}
          className="add-website-btn"
        >
          Add Website
        </Button>
      </div>

      <Row gutter={[24, 24]}>
        {loading ? (
          renderSkeletonCards()
        ) : websites.length === 0 ? (
          <Col span={24}>
            <Empty
              description={<span style={{ color: 'var(--text-color)' }}>No websites added yet</span>}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => navigate('/add-website')}
                style={{
                  backgroundColor: 'var(--primary-color)',
                  borderColor: 'var(--primary-color)',
                  transition: 'all 0.3s'
                }}
              >
                Add Your First Website
              </Button>
            </Empty>
          </Col>
        ) : (
          websites.map((website) => (
            <Col xs={24} sm={12} md={8} lg={6} key={website.id}>
              <Card
                bordered={false}
                style={{
                  height: '100%',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  overflow: 'hidden',
                  backgroundColor: 'var(--component-background)',
                  borderColor: 'var(--border-color)',
                  transition: 'all 0.3s'
                }}
                bodyStyle={{ padding: '16px' }}
                hoverable
                className="website-card"
                onClick={() => navigate(`/website-dashboard/${website.id}`)}
              >
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      height: '120px',
                      background: 'rgba(100, 108, 255, 0.08)',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      position: 'relative',
                      marginBottom: '16px'
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${website.icon})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.12,
                        filter: 'blur(6px)'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      zIndex: 2
                    }}>
                      {getStatusBadge(website.status)}
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      padding: '12px',
                      position: 'relative',
                      zIndex: 1,
                      height: '100%'
                    }}>
                      <Avatar
                        src={website.icon}
                        size={58}
                        style={{
                          border: '2px solid var(--component-background)',
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <div style={{ marginLeft: '12px' }}>
                        <Title level={4} style={{ marginBottom: '0', color: 'var(--text-color)' }}>
                          {website.displayName}
                        </Title>
                        <Text style={{ fontSize: '12px', color: 'var(--text-color)', opacity: 0.7 }}>
                          {website.websiteUrl.replace(/^https?:\/\//, '')}
                        </Text>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <Text style={{ fontSize: '13px', display: 'block', marginBottom: '8px', color: 'var(--text-color)', opacity: 0.8 }}>
                      Connected channels:
                    </Text>
                    <Space size={[0, 8]} wrap>
                      {website.channels.map((channel, index) => (
                        <Tooltip key={index} title={`${channel.type}: ${channel.username}`}>
                          <Tag
                            icon={getChannelIcon(channel.type)}
                            style={{
                              borderRadius: '4px',
                              padding: '2px 8px',
                              backgroundColor: 'rgba(0, 0, 0, 0.04)',
                              borderColor: 'var(--border-color)',
                              color: 'var(--text-color)'
                            }}
                          >
                            {channel.username}
                          </Tag>
                        </Tooltip>
                      ))}
                    </Space>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '12px',
                  marginTop: '12px'
                }}>
                  <div>
                    <Button
                      type="text"
                      icon={<DashboardOutlined />}
                      size="small"
                      style={{ color: 'var(--text-color)' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/website-dashboard/${website.id}`);
                      }}
                    >
                      Dashboard
                    </Button>
                    <Button
                      type="text"
                      icon={<LinkOutlined />}
                      size="small"
                      style={{ color: 'var(--text-color)' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(website.websiteUrl, '_blank');
                      }}
                    >
                      Visit
                    </Button>
                  </div>
                  <Dropdown
                    overlay={getWebsiteDropdownMenu(website)}
                    placement="bottomRight"
                    trigger={['click']}
                  >
                    <Button
                      type="text"
                      icon={<EllipsisOutlined />}
                      style={{ color: 'var(--text-color)' }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </Dropdown>
                </div>
              </Card>
            </Col>
          ))
        )}
      </Row>


    </>
  );
};

export default Home;