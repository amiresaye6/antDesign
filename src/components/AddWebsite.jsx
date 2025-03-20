import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { addWebsite } from '../store/slices/websitesSlice';
import GoBackButton from './GoBackButton';

const { Title, Text } = Typography;
const { Option } = Select;

const AddWebsite = () => {
  const { t } = useTranslation('addWebsite');
  const [form] = Form.useForm();
  const [channels, setChannels] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Channel types with their respective icons
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

  const addChannel = () => {
    setChannels([...channels, { id: Date.now(), type: undefined, username: '', apiToken: '', profileUrl: '' }]);
  };

  const removeChannel = (id) => {
    setChannels(channels.filter(channel => channel.id !== id));
  };

  const updateChannel = (id, field, value) => {
    setChannels(channels.map(channel =>
      channel.id === id ? { ...channel, [field]: value } : channel
    ));
  };

  const handleSubmit = (values) => {
    // Prepare channels data by filtering out incomplete entries and removing temporary ids
    const validChannels = channels
      .filter(channel => channel.type && channel.username)
      // eslint-disable-next-line no-unused-vars
      .map(({ id, ...channelData }) => channelData);

    // Process icon file upload
    let iconPath = '/default-website-icon.webp'; // Default icon path
    if (values.icon && values.icon.length > 0) {
      // In a real app, you would upload the file to your server/cloud storage
      // and get back a URL, for now we'll just use the file name
      iconPath = `/${values.icon[0].name}`;
    }

    // Prepare website data
    const websiteData = {
      displayName: values.displayName,
      websiteUrl: values.websiteUrl,
      icon: iconPath,
      channels: validChannels,
    };

    // Dispatch action to add website to Redux store
    dispatch(addWebsite(websiteData));
    
    message.success(t('websiteAddedSuccessfully'));
    navigate('/');
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
    <GoBackButton tooltipText="Return to previous page" buttonType="primary" style={{marginBottom: "15px"}}/>
    <Card title={t('addNewWebsite')} style={{ width: '100%' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          displayName: '',
          websiteUrl: '',
        }}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="displayName"
              label={t('displayName')}
              rules={[{ required: true, message: t('pleaseEnterDisplayName') }]}
            >
              <Input placeholder={t('enterWebsiteName')} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="websiteUrl"
              label={t('websiteUrl')}
              rules={[
                { required: true, message: t('pleaseEnterWebsiteUrl') },
                { type: 'url', message: t('pleaseEnterValidUrl') }
              ]}
            >
              <Input placeholder={t('websiteUrlPlaceholder')} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="icon"
          label={t('websiteIcon')}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="icon" listType="picture" maxCount={1} beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>{t('uploadIcon')}</Button>
          </Upload>
        </Form.Item>

        <Divider orientation="left">{t('socialMediaChannels')}</Divider>

        {channels.map((channel, index) => (
          <div key={channel.id}>
            <Row gutter={16} align="middle">
              <Col xs={24} md={6}>
                <Form.Item label={index === 0 ? t('channelType') : ''}>
                  <Select
                    placeholder={t('selectChannel')}
                    value={channel.type}
                    onChange={(value) => updateChannel(channel.id, 'type', value)}
                    style={{ width: '100%' }}
                  >
                    {channelTypes.map(type => (
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
                <Form.Item label={index === 0 ? t('username') : ''}>
                  <Input
                    placeholder={t('usernamePlaceholder')}
                    value={channel.username}
                    onChange={(e) => updateChannel(channel.id, 'username', e.target.value)}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={6}>
                <Form.Item label={index === 0 ? t('profileUrl') : ''}>
                  <Input
                    placeholder={t('profileUrlPlaceholder')}
                    value={channel.profileUrl}
                    onChange={(e) => updateChannel(channel.id, 'profileUrl', e.target.value)}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={5}>
                <Form.Item label={index === 0 ? t('apiToken') : ''}>
                  <Input.Password
                    placeholder={t('apiTokenPlaceholder')}
                    value={channel.apiToken}
                    onChange={(e) => updateChannel(channel.id, 'apiToken', e.target.value)}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={1}>
                <Form.Item label={index === 0 ? ' ' : ''}>
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeChannel(channel.id)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        ))}

        <Form.Item>
          <Button
            type="dashed"
            onClick={addChannel}
            block
            icon={<PlusOutlined />}
            style={{ marginBottom: 16 }}
          >
            {t('addChannel')}
          </Button>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {t('saveWebsite')}
            </Button>
            <Button onClick={() => navigate('/')}>
              {t('cancel')}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
    </>

  );
};

export default AddWebsite;