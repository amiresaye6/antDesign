import React from 'react';
import { useLocation } from 'react-router-dom';
import { Result, Button, Typography, Space, Card } from 'antd';
import {
    ToolOutlined,
    ArrowLeftOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Text, Title } = Typography;

const NotImplementedYet = () => {
    const location = useLocation();
    const { t } = useTranslation('common');

    // Format the path nicely
    const formattedPath = location.pathname === '/'
        ? '/'
        : location.pathname.replace(/^\/|\/$/g, '').replace(/-/g, ' ');

    // Capitalize the first letter of each word
    const capitalizedPath = formattedPath
        .split('/')
        .map(segment => segment
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        )
        .join(' > ');

    return (
        <>
            <Result
                icon={<ExclamationCircleOutlined style={{ color: '#faad14' }} />}
                title={
                    <Title level={2} style={{ marginBottom: '16px' }}>
                        {t('Under Construction')}
                    </Title>
                }
                subTitle={
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <Title level={4}>
                            {t('The page')} <Text code>{capitalizedPath}</Text> {t('is not implemented yet')}
                        </Title>

                        <Card
                            type="inner"
                            size="small"
                            title={
                                <Space>
                                    <ToolOutlined />
                                    {t('Technical Details')}
                                </Space>
                            }
                            style={{
                                maxWidth: '500px',
                                margin: '0 auto',
                                backgroundColor: 'rgba(0, 0, 0, 0.02)'
                            }}
                        >
                            <Text>{t('Route')}: <Text code>{location.pathname}</Text></Text>
                        </Card>
                    </Space>
                }
                extra={
                    <Space>
                        <Button
                            type="primary"
                            icon={<ArrowLeftOutlined />}
                            onClick={() => window.history.back()}
                        >
                            {t('Go Back')}
                        </Button>
                        <Button
                            type="default"
                            onClick={() => window.location.href = '/'}
                        >
                            {t('Go to Home')}
                        </Button>
                    </Space>
                }
            />
        </>
    );
};

export default NotImplementedYet;