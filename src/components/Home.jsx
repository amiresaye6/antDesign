import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  LinkOutlined,
  PlayCircleOutlined,
  MessageOutlined,
  CommentOutlined,
  CameraOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  selectAllWebsites,
  selectWebsitesLoading,
  fetchWebsitesStart,
  fetchWebsitesSuccess,
  deleteWebsite
} from '../store/slices/websitesSlice';

const { Title, Text } = Typography;

const Home = () => {
  const { t } = useTranslation('home');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get websites and loading state from Redux store
  const websites = useSelector(selectAllWebsites);
  const loading = useSelector(selectWebsitesLoading);

  const fetchWebsites = useCallback(async () => {
    dispatch(fetchWebsitesStart());

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // In a real app, you would fetch data from an API
      // For now, we'll simulate a successful API response by
      // dispatching the success action with mock data from the store

      // Fix: Don't use local websites which creates circular dependency
      // Instead, in a real app this would come from your API response
      // For demo, we'll just use the initialState data that's in the Redux store
      dispatch(fetchWebsitesSuccess(websites));
    } catch (error) {
      console.error('Error fetching websites:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]); // Remove websites from dependency array

  useEffect(() => {
    fetchWebsites();
  }, [fetchWebsites]);

  const handleDeleteWebsite = (id) => {
    dispatch(deleteWebsite(id));
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
      case 'tiktok':
        return <PlayCircleOutlined style={{ color: '#000000' }} />;
      case 'whatsapp':
        return <MessageOutlined style={{ color: '#25D366' }} />;
      case 'threads':
        return <CommentOutlined style={{ color: '#000000' }} />;
      case 'snapchat':
        return <CameraOutlined style={{ color: '#FFFC00' }} />;
      default:
        return <GlobalOutlined />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge status="success" text={t('status.active')} />;
      case 'maintenance':
        return <Badge status="warning" text={t('status.maintenance')} />;
      case 'offline':
        return <Badge status="error" text={t('status.offline')} />;
      default:
        return <Badge status="default" text={t('status.unknown')} />;
    }
  };

  const getWebsiteDropdownMenu = (website) => (
    <Menu>
      <Menu.Item key="1" icon={<EditOutlined />}>
        <Link
          to={`/manage-website/${website.id}`}
          onClick={(e) => e.stopPropagation()}
        >
          {t('dropdown.manage')}
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" danger icon={<DeleteOutlined />}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDeleteWebsite(website.id);
          }}
        >
          {t('dropdown.delete')}
        </a>
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
        <Title level={2} style={{ margin: 0, color: 'var(--text-color)' }}>{t('myWebsites')}</Title>
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
          {t('addWebsite')}
        </Button>
      </div>

      <Row gutter={[24, 24]}>
        {loading ? (
          renderSkeletonCards()
        ) : websites.length === 0 ? (
          <Col span={24}>
            <Empty
              description={<span style={{ color: 'var(--text-color)' }}>{t('noWebsitesAddedYet')}</span>}
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
                {t('addYourFirstWebsite')}
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
                onClick={() => navigate(`/channels-dashboard/${website.id}`)}
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
                      {t('connectedChannels')}
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
                      {t('dashboard')}
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
                      {t('visit')}
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