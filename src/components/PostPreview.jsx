// components/PostPreview.js
import React from 'react';
import { Card, Typography, Space, Tag } from 'antd';
import { useTranslation } from 'react-i18next';

const { Text, Paragraph } = Typography;

const PostPreview = ({ preview }) => {
  const { t } = useTranslation('postsDashboard');
  
  if (!preview) return null;
  
  const { type, media, caption, hashtags, platforms } = preview;

  return (
    <div className="post-preview">
      <div className="preview-media">
        {type === 'image' ? (
          <img 
            src={media.url || URL.createObjectURL(media.originFileObj)} 
            alt="Preview" 
            style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'contain' }}
          />
        ) : (
          <div style={{ background: '#f0f0f0', padding: 20, textAlign: 'center' }}>
            <Text>{t('videoPreview')}</Text>
          </div>
        )}
      </div>
      
      <Paragraph 
        style={{ marginTop: 10 }}
        ellipsis={{ rows: 3, expandable: true }}
      >
        {caption}
      </Paragraph>
      
      {hashtags && hashtags.length > 0 && (
        <Space wrap style={{ marginTop: 5 }}>
          {hashtags.map((tag, index) => (
            <Tag key={index} color="blue">
              {tag.startsWith('#') ? tag : `#${tag}`}
            </Tag>
          ))}
        </Space>
      )}
    </div>
  );
};

export default PostPreview;