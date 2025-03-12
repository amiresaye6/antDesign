// components/PostAnalytics.js
import React from 'react';
import { Card, Row, Col, Statistic, Select, Divider, DatePicker, Empty } from 'antd';
import {
  LikeOutlined,
  CommentOutlined,
  ShareAltOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Option } = Select;
const { RangePicker } = DatePicker;

const PostAnalytics = () => {
  const { t } = useTranslation('postsDashboard');
  
  // Mock data - would be fetched from API in real application
  const analyticsData = {
    likes: 1245,
    comments: 342,
    shares: 189,
    views: 7890,
    engagement: '3.2%'
  };
  
  return (
    <div className="post-analytics">
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Select defaultValue="all" style={{ width: 150 }}>
          <Option value="all">{t('allPlatforms')}</Option>
          <Option value="facebook">Facebook</Option>
          <Option value="instagram">Instagram</Option>
          <Option value="twitter">Twitter</Option>
          <Option value="linkedin">LinkedIn</Option>
          <Option value="youtube">YouTube</Option>
        </Select>
        
        <RangePicker />
      </div>
      
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title={t('likes')}
              value={analyticsData.likes}
              prefix={<LikeOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        
        <Col span={6}>
          <Card>
            <Statistic
              title={t('comments')}
              value={analyticsData.comments}
              prefix={<CommentOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        
        <Col span={6}>
          <Card>
            <Statistic
              title={t('shares')}
              value={analyticsData.shares}
              prefix={<ShareAltOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        
        <Col span={6}>
          <Card>
            <Statistic
              title={t('views')}
              value={analyticsData.views}
              prefix={<EyeOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>
      
      <Divider>{t('platformBreakdown')}</Divider>
      
      <div style={{ textAlign: 'center', padding: '30px 0' }}>
        <Empty description={t('selectDateRangeForData')} />
      </div>
    </div>
  );
};

export default PostAnalytics;