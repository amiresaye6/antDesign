// components/MediaUploader.js
import React, { useState } from 'react';
import { Upload, Button, Space, Divider, Typography, message } from 'antd';
import { 
  UploadOutlined,
  PictureOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

const MediaUploader = ({ onChange }) => {
  const { t } = useTranslation('postsDashboard');
  const [fileList, setFileList] = useState([]);
  const [mediaType, setMediaType] = useState('');
  
  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
    
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      const type = file.type.startsWith('image/') ? 'image' : 'video';
      setMediaType(type);
      
      if (onChange) {
        onChange(fileList, type);
      }
    }
  };
  
  const beforeUpload = (file) => {
    const isImageOrVideo = 
      file.type.startsWith('image/') || 
      file.type.startsWith('video/');
    
    if (!isImageOrVideo) {
      message.error(t('onlyImageOrVideoAllowed'));
    }
    
    const isLt100M = file.size / 1024 / 1024 < 100;
    if (!isLt100M) {
      message.error(t('fileTooLarge'));
    }
    
    return isImageOrVideo && isLt100M;
  };
  
  return (
    <div className="media-uploader">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Title level={5}>{t('dragOrClick')}</Title>
        
        <Upload.Dragger
          fileList={fileList}
          beforeUpload={beforeUpload}
          onChange={handleUpload}
          maxCount={1}
          accept="image/*,video/*"
          multiple={false}
          showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
        >
          <p className="ant-upload-drag-icon">
            <Space>
              <PictureOutlined />
              <VideoCameraOutlined />
            </Space>
          </p>
          <p className="ant-upload-text">{t('clickOrDragToUpload')}</p>
          <p className="ant-upload-hint">{t('supportedFileTypes')}</p>
        </Upload.Dragger>
      </Space>
    </div>
  );
};

export default MediaUploader;