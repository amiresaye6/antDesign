import React, { useState } from 'react';
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
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { Option } = Select;

const AddWebsite = () => {
  const [form] = Form.useForm();
  const [channels, setChannels] = useState([]);
  const navigate = useNavigate();

  // Channel types with their respective icons
const channelTypes = [
    { value: 'facebook', label: 'Facebook', icon: <FacebookOutlined /> },
    { value: 'instagram', label: 'Instagram', icon: <InstagramOutlined /> },
    { value: 'twitter', label: 'X (Twitter)', icon: <TwitterOutlined /> },
    { value: 'youtube', label: 'YouTube', icon: <YoutubeOutlined /> },
    { value: 'tiktok', label: 'TikTok', icon: <PlusOutlined /> },
    { value: 'whatsapp', label: 'WhatsApp', icon: <PlusOutlined /> },
    { value: 'threads', label: 'Threads', icon: <PlusOutlined /> },
    { value: 'snapchat', label: 'Snapchat', icon: <PlusOutlined /> },
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
    // Combine form values with channels
    const websiteData = {
      ...values,
      // eslint-disable-next-line no-unused-vars
      channels: channels.map(({ id, ...rest }) => rest) // Remove the temporary id
    };
    
    console.log('Submitting website data:', websiteData);
    message.success('Website added successfully!');
    
    // Navigate back to home page or the websites list
    navigate('/dashboard');
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Card title="Add New Website" style={{ width: '100%' }}>
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
              label="Display Name"
              rules={[{ required: true, message: 'Please enter the display name' }]}
            >
              <Input placeholder="Enter website name" />
            </Form.Item>
          </Col>
          
          <Col xs={24} md={12}>
            <Form.Item
              name="websiteUrl"
              label="Website URL"
              rules={[
                { required: true, message: 'Please enter the website URL' },
                { type: 'url', message: 'Please enter a valid URL' }
              ]}
            >
              <Input placeholder="https://example.com" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="icon"
          label="Website Icon"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="icon" listType="picture" maxCount={1} beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Upload Icon</Button>
          </Upload>
        </Form.Item>

        <Divider orientation="left">Social Media Channels</Divider>
        
        {channels.map((channel, index) => (
          <div key={channel.id}>
            <Row gutter={16} align="middle">
              <Col xs={24} md={6}>
                <Form.Item label={index === 0 ? "Channel Type" : ""}>
                  <Select
                    placeholder="Select channel"
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
                <Form.Item label={index === 0 ? "Username" : ""}>
                  <Input
                    placeholder="Username"
                    value={channel.username}
                    onChange={(e) => updateChannel(channel.id, 'username', e.target.value)}
                  />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={6}>
                <Form.Item label={index === 0 ? "Profile URL" : ""}>
                  <Input
                    placeholder="Profile URL"
                    value={channel.profileUrl}
                    onChange={(e) => updateChannel(channel.id, 'profileUrl', e.target.value)}
                  />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={5}>
                <Form.Item label={index === 0 ? "API Token" : ""}>
                  <Input.Password
                    placeholder="API Token"
                    value={channel.apiToken}
                    onChange={(e) => updateChannel(channel.id, 'apiToken', e.target.value)}
                  />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={1}>
                <Form.Item label={index === 0 ? " " : ""}>
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
            Add Channel
          </Button>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Save Website
            </Button>
            <Button onClick={() => navigate('/dashboard')}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddWebsite;