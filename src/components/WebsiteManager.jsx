import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  Space,
  Typography,
  Divider,
  Upload,
  message,
  Row,
  Col,
  Collapse,
  Tooltip,
  Spin,
  Alert,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  CameraOutlined,
  CommentOutlined,
  MessageOutlined,
  PlayCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { updateWebsite, selectWebsiteById, selectWebsitesLoading } from '../store/slices/websitesSlice';
import GoBackButton from './GoBackButton';

const { Title, Text } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const WebsiteManager = () => {
  const { t } = useTranslation('websiteManager');
  const [form] = Form.useForm();
  const { websiteId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Select data from Redux store
  const website = useSelector((state) => selectWebsiteById(state, parseInt(websiteId)));
  const loading = useSelector(selectWebsitesLoading);

  const [channels, setChannels] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const channelTypes = [
    { value: 'facebook', label: t('channelTypes.facebook'), icon: <FacebookOutlined style={{ color: '#3b5998' }} /> },
    { value: 'instagram', label: t('channelTypes.instagram'), icon: <InstagramOutlined style={{ color: '#E1306C' }} /> },
    { value: 'twitter', label: t('channelTypes.twitter'), icon: <TwitterOutlined style={{ color: '#1DA1F2' }} /> },
    { value: 'youtube', label: t('channelTypes.youtube'), icon: <YoutubeOutlined style={{ color: '#FF0000' }} /> },
    { value: 'tiktok', label: t('channelTypes.tiktok'), icon: <PlayCircleOutlined style={{ color: '#000000' }} /> },
    { value: 'whatsapp', label: t('channelTypes.whatsapp'), icon: <MessageOutlined style={{ color: '#25D366' }} /> },
    { value: 'threads', label: t('channelTypes.threads'), icon: <CommentOutlined style={{ color: '#000000' }} /> },
    { value: 'snapchat', label: t('channelTypes.snapchat'), icon: <CameraOutlined style={{ color: '#FFFC00' }} /> },
  ];

  const statusOptions = [
    { value: 'active', label: t('status.active'), color: '#52c41a' },
    { value: 'maintenance', label: t('status.maintenance'), color: '#faad14' },
    { value: 'offline', label: t('status.offline'), color: '#ff4d4f' },
  ];

  useEffect(() => {
    if (website) {
      form.setFieldsValue({
        displayName: website.displayName,
        websiteUrl: website.websiteUrl,
        status: website.status,
      });
      setChannels(website.channels.map((ch, idx) => ({ ...ch, id: idx })));
    }
  }, [website, form]);

  const addChannel = () => {
    setChannels([...channels, { id: Date.now(), type: undefined, username: '', apiToken: '', profileUrl: '' }]);
  };

  const removeChannel = (id) => {
    setChannels(channels.filter((channel) => channel.id !== id));
  };

  const updateChannel = (id, field, value) => {
    setChannels(channels.map((channel) =>
      channel.id === id ? { ...channel, [field]: value } : channel
    ));
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      const validChannels = channels
        .filter((channel) => channel.type && channel.username)
        // eslint-disable-next-line no-unused-vars
        .map(({ id, ...channelData }) => channelData);

      let iconPath = website.icon;
      if (values.icon && values.icon.length > 0) {
        iconPath = `/${values.icon[0].name}`;
      }

      const updatedWebsiteData = {
        id: parseInt(websiteId),
        displayName: values.displayName,
        websiteUrl: values.websiteUrl,
        icon: iconPath,
        channels: validChannels,
        status: values.status,
        lastUpdated: new Date().toISOString(), // Add timestamp for last update
      };

      await dispatch(updateWebsite(updatedWebsiteData));
      message.success(t('websiteUpdatedSuccessfully'));
      navigate('/');
    } catch (error) {
      message.error(`${t('updateFailed')}: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  if (!website) {
    return (
      <Alert
        message={t('websiteNotFound')}
        type="warning"
        showIcon
        style={{ margin: '20px' }}
      />
    );
  }

  return (
    <Spin spinning={loading || submitting}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <GoBackButton
          tooltipText={t('returnToPrevious')}
          buttonType="primary"
          style={{ marginBottom: 0 }}
        />

        <Card
          title={<Title level={3}>{t('manageWebsite')}</Title>}
          extra={
            <Tooltip title={t('lastUpdated')}>
              <Text type="secondary">
                {website.lastUpdated ? new Date(website.lastUpdated).toLocaleDateString() : t('notAvailable')}
              </Text>
            </Tooltip>
          }
          style={{ width: '100%', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{ status: 'active' }}
            scrollToFirstError
          >
            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="displayName"
                  label={t('displayName')}
                  rules={[{ required: true, message: t('pleaseEnterDisplayName') }]}
                  tooltip={t('displayNameTooltip')}
                >
                  <Input
                    placeholder={t('enterWebsiteName')}
                    size="large"
                    prefix={<InfoCircleOutlined />}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="websiteUrl"
                  label={t('websiteUrl')}
                  rules={[
                    { required: true, message: t('pleaseEnterWebsiteUrl') },
                    { type: 'url', message: t('pleaseEnterValidUrl') },
                  ]}
                  tooltip={t('websiteUrlTooltip')}
                >
                  <Input
                    placeholder={t('websiteUrlPlaceholder')}
                    size="large"
                    prefix="https://"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="icon"
                  label={t('websiteIcon')}
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  extra={t('iconRequirements')}
                >
                  <Upload
                    name="icon"
                    listType="picture-card"
                    maxCount={1}
                    beforeUpload={() => false}
                    accept="image/*"
                  >
                    <Space direction="vertical">
                      <UploadOutlined />
                      <div>{t('uploadIcon')}</div>
                    </Space>
                  </Upload>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="status"
                  label={t('status')}
                  rules={[{ required: true, message: t('pleaseSelectStatus') }]}
                >
                  <Select
                    placeholder={t('selectStatus')}
                    size="large"
                    optionLabelProp="label"
                  >
                    {statusOptions.map((option) => (
                      <Option key={option.value} value={option.value} label={option.label}>
                        <Space>
                          <span
                            style={{
                              display: 'inline-block',
                              width: 10,
                              height: 10,
                              backgroundColor: option.color,
                              borderRadius: '50%',
                            }}
                          />
                          {option.label}
                        </Space>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Collapse
              defaultActiveKey={['1']}
              bordered={false}
              style={{ marginBottom: 24 }}
            >
              <Panel
                header={<Title level={4}>{t('socialMediaChannels')}</Title>}
                key="1"
              >
                {channels.map((channel) => (
                  <Card
                    key={channel.id}
                    size="small"
                    style={{ marginBottom: 16 }}
                    actions={[
                      <Tooltip title={t('removeChannel')}>
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => removeChannel(channel.id)}
                        />
                      </Tooltip>,
                    ]}
                  >
                    <Row gutter={[16, 16]}>
                      <Col xs={24} md={6}>
                        <Form.Item label={t('channelType')}>
                          <Select
                            placeholder={t('selectChannel')}
                            value={channel.type}
                            onChange={(value) => updateChannel(channel.id, 'type', value)}
                            size="large"
                          >
                            {channelTypes.map((type) => (
                              <Option key={type.value} value={type.value}>
                                <Space>
                                  {type.icon}
                                  {type.label}
                                </Space>
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={6}>
                        <Form.Item label={t('username')}>
                          <Input
                            placeholder={t('usernamePlaceholder')}
                            value={channel.username}
                            onChange={(e) => updateChannel(channel.id, 'username', e.target.value)}
                            size="large"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={6}>
                        <Form.Item label={t('profileUrl')}>
                          <Input
                            placeholder={t('profileUrlPlaceholder')}
                            value={channel.profileUrl}
                            onChange={(e) => updateChannel(channel.id, 'profileUrl', e.target.value)}
                            size="large"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={6}>
                        <Form.Item label={t('apiToken')}>
                          <Input.Password
                            placeholder={t('apiTokenPlaceholder')}
                            value={channel.apiToken}
                            onChange={(e) => updateChannel(channel.id, 'apiToken', e.target.value)}
                            size="large"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                ))}

                <Button
                  type="dashed"
                  onClick={addChannel}
                  block
                  icon={<PlusOutlined />}
                  size="large"
                  style={{ marginBottom: 16 }}
                >
                  {t('addChannel')}
                </Button>
              </Panel>
            </Collapse>

            <Form.Item>
              <Space size="middle">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={submitting}
                >
                  {t('saveChanges')}
                </Button>
                <Button
                  size="large"
                  onClick={() => navigate('/')}
                  disabled={submitting}
                >
                  {t('cancel')}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </Spin>
  );
};

export default WebsiteManager;