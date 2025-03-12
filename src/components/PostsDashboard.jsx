import React, { useState, useRef } from 'react';
import { 
  Layout, 
  Typography, 
  Card, 
  Tabs, 
  Form, 
  Input, 
  Select, 
  Button, 
  Upload, 
  Switch, 
  DatePicker, 
  Checkbox, 
  message, 
  Tag,
  Space,
  Divider
} from 'antd';
import { 
  UploadOutlined, 
  PictureOutlined, 
  VideoCameraOutlined, 
  CalendarOutlined,
  SendOutlined,
  TagsOutlined,
  GlobalOutlined,
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  YoutubeOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import PlatformSelector from './PlatformSelector';
import PostPreview from './PostPreview';
import MediaUploader from './MediaUploader';
import PostScheduler from './PostScheduler';
import PostAnalytics from './PostAnalytics';

const { Header, Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

const PostsDashboard = () => {
  const { t } = useTranslation('postsDashboard');
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [postType, setPostType] = useState('image'); // image, video
  const [selectedPlatforms, setSelectedPlatforms] = useState(['facebook', 'instagram']);
  const [isScheduled, setIsScheduled] = useState(false);
  const [postPreview, setPostPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const fileInputRef = useRef(null);

  // Platform icons mapping
  const platformIcons = {
    facebook: <FacebookOutlined />,
    instagram: <InstagramOutlined />,
    twitter: <TwitterOutlined />,
    linkedin: <LinkedinOutlined />,
    youtube: <YoutubeOutlined />
  };

  // Available platforms
  const platforms = [
    { key: 'facebook', name: 'Facebook', icon: <FacebookOutlined />, color: '#1877F2' },
    { key: 'instagram', name: 'Instagram', icon: <InstagramOutlined />, color: '#E1306C' },
    { key: 'twitter', name: 'Twitter', icon: <TwitterOutlined />, color: '#1DA1F2' },
    { key: 'linkedin', name: 'LinkedIn', icon: <LinkedinOutlined />, color: '#0077B5' },
    { key: 'youtube', name: 'YouTube', icon: <YoutubeOutlined />, color: '#FF0000' }
  ];

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
    
    // Determine post type based on file extension
    if (fileList.length > 0) {
      const fileName = fileList[0].name.toLowerCase();
      if (fileName.endsWith('.mp4') || fileName.endsWith('.mov') || fileName.endsWith('.avi')) {
        setPostType('video');
      } else {
        setPostType('image');
      }
      
      // Generate preview
      generatePostPreview(fileList, form.getFieldsValue());
    }
  };

  const handlePlatformChange = (platforms) => {
    setSelectedPlatforms(platforms);
  };

  const handleFormValuesChange = (changedValues, allValues) => {
    generatePostPreview(fileList, allValues);
  };

  const generatePostPreview = (files, formValues) => {
    if (files.length > 0) {
      const file = files[0];
      setPostPreview({
        type: postType,
        media: file,
        caption: formValues.caption,
        hashtags: formValues.hashtags ? formValues.hashtags.split(' ') : [],
        platforms: selectedPlatforms
      });
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    
    try {
      // In a real application, you would handle file uploads and post creation here
      console.log('Posting to platforms:', selectedPlatforms);
      console.log('Post data:', values);
      console.log('Files:', fileList);
      console.log('Scheduled:', isScheduled ? values.scheduledTime : 'Immediate');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      message.success(t('postSuccess'));
      form.resetFields();
      setFileList([]);
      setPostPreview(null);
    } catch (error) {
      console.error('Error posting content:', error);
      message.error(t('postError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="posting-dashboard">
      <Header className="dashboard-header" style={{ background: '#fff', padding: '0 20px' }}>
        <Title level={2}>{t('postsDashboard')}</Title>
      </Header>
      
      <Content style={{ padding: '20px' }}>
        <Card>
          <Tabs defaultActiveKey="create">
            <TabPane 
              tab={
                <span>
                  <SendOutlined />
                  {t('createPost')}
                </span>
              } 
              key="create"
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                onValuesChange={handleFormValuesChange}
              >
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ flex: 2 }}>
                    <Form.Item
                      label={t('uploadMedia')}
                      name="media"
                      rules={[{ required: true, message: t('pleaseUploadMedia') }]}
                    >
                      <Upload
                        fileList={fileList}
                        onChange={handleUploadChange}
                        beforeUpload={() => false}
                        maxCount={1}
                        listType="picture"
                      >
                        <Button icon={<UploadOutlined />}>{t('selectFile')}</Button>
                      </Upload>
                    </Form.Item>
                    
                    <Form.Item
                      label={t('caption')}
                      name="caption"
                      rules={[{ required: true, message: t('pleaseEnterCaption') }]}
                    >
                      <TextArea rows={4} />
                    </Form.Item>
                    
                    <Form.Item
                      label={t('hashtags')}
                      name="hashtags"
                    >
                      <Input prefix={<TagsOutlined />} placeholder={t('hashtagsPlaceholder')} />
                    </Form.Item>
                    
                    <Form.Item
                      label={t('platforms')}
                      name="platforms"
                      initialValue={selectedPlatforms}
                    >
                      <PlatformSelector 
                        platforms={platforms} 
                        selectedPlatforms={selectedPlatforms}
                        onChange={handlePlatformChange}
                      />
                    </Form.Item>
                    
                    <Divider />
                    
                    <Form.Item
                      label={t('schedulePost')}
                      name="schedule"
                      valuePropName="checked"
                    >
                      <Switch 
                        checkedChildren={<CalendarOutlined />} 
                        onChange={(checked) => setIsScheduled(checked)}
                      />
                    </Form.Item>
                    
                    {isScheduled && (
                      <Form.Item
                        label={t('scheduledTime')}
                        name="scheduledTime"
                        rules={[{ required: isScheduled, message: t('pleaseSelectTime') }]}
                      >
                        <DatePicker showTime format="YYYY-MM-DD HH:mm" />
                      </Form.Item>
                    )}
                    
                    <Form.Item>
                      <Button 
                        type="primary" 
                        htmlType="submit" 
                        loading={loading}
                        icon={<SendOutlined />}
                        style={{ marginRight: 10 }}
                      >
                        {isScheduled ? t('schedule') : t('publish')}
                      </Button>
                      <Button onClick={() => form.resetFields()}>
                        {t('reset')}
                      </Button>
                    </Form.Item>
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <Card title={t('preview')} style={{ marginBottom: 20 }}>
                      {postPreview ? (
                        <PostPreview preview={postPreview} />
                      ) : (
                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                          {postType === 'video' ? <VideoCameraOutlined style={{ fontSize: 48 }} /> : <PictureOutlined style={{ fontSize: 48 }} />}
                          <p>{t('previewPlaceholder')}</p>
                        </div>
                      )}
                    </Card>
                    
                    <Card title={t('selectedPlatforms')}>
                      <Space wrap>
                        {selectedPlatforms.length === 0 ? (
                          <span>{t('noPlatformsSelected')}</span>
                        ) : (
                          selectedPlatforms.map(platform => {
                            const platformInfo = platforms.find(p => p.key === platform);
                            return (
                              <Tag 
                                key={platform} 
                                icon={platformInfo.icon}
                                color={platformInfo.color}
                              >
                                {platformInfo.name}
                              </Tag>
                            );
                          })
                        )}
                      </Space>
                    </Card>
                  </div>
                </div>
              </Form>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <CalendarOutlined />
                  {t('scheduledPosts')}
                </span>
              } 
              key="scheduled"
            >
              <PostScheduler />
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <GlobalOutlined />
                  {t('analytics')}
                </span>
              } 
              key="analytics"
            >
              <PostAnalytics />
            </TabPane>
          </Tabs>
        </Card>
      </Content>
    </Layout>
  );
};

export default PostsDashboard;