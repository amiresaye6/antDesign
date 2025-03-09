import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    GoogleOutlined,
    LockOutlined,
    MailOutlined,
} from '@ant-design/icons';
import {
    Button,
    Checkbox,
    Form,
    Input,
    Flex,
    Card,
    Typography,
    Divider,
    Space,
    message,
    ConfigProvider,
} from 'antd';
import { Link } from 'react-router-dom';
import enUS from 'antd/lib/locale/en_US';
import arEG from 'antd/lib/locale/ar_EG';

const { Title, Text } = Typography;

const LoginCard = () => {
    const { t, i18n } = useTranslation(['login', 'common']); // Load 'login' and 'common' namespaces
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [direction, setDirection] = useState('ltr');
    const [locale, setLocale] = useState(enUS);

    useEffect(() => {
        if (i18n.language === 'ar') {
            setDirection('rtl');
            setLocale(arEG);
        } else {
            setDirection('ltr');
            setLocale(enUS);
        }
        form.resetFields();
    }, [i18n.language, form]);

    const onFinish = (values) => {
        setLoading(true);
        console.log('Received values of form: ', values);
        setTimeout(() => {
            setLoading(false);
            message.success(t('loginSuccessful'));
        }, 1500);
    };

    return (
        <ConfigProvider locale={locale} direction={direction}>
            <Flex justify="center" align="center" style={{ minHeight: '100vh', background: '#f0f2f5' }}>
                <Card
                    style={{
                        width: 400,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        borderRadius: '8px',
                    }}
                >
                    <Flex vertical align="center" gap="small">
                        <Title level={2} style={{ marginBottom: 0 }}>{t('welcomeBack')}</Title>
                        <Text type="secondary" style={{ marginBottom: 16 }}>{t('signInToAccount')}</Text>

                        <Form
                            form={form}
                            name="login"
                            layout="vertical"
                            initialValues={{ remember: true }}
                            style={{ width: '100%' }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="email"
                                label={t('email', { ns: 'common' })}
                                rules={[
                                    { required: true, message: t('pleaseEnterEmail') },
                                    { type: 'email', message: t('invalidEmail', { ns: 'common' }) },
                                ]}
                            >
                                <Input
                                    prefix={<MailOutlined />}
                                    placeholder={t('emailPlaceholder', { ns: 'common' })}
                                    size="large"
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label={t('password', { ns: 'common' })}
                                rules={[
                                    { required: true, message: t('pleaseEnterPassword') },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder={t('passwordPlaceholder', { ns: 'common' })}
                                    size="large"
                                />
                            </Form.Item>

                            <Flex justify="space-between" align="center" style={{ marginBottom: 24 }}>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>{t('rememberMe')}</Checkbox>
                                </Form.Item>

                                <Link to="/forgotPassword">{t('forgotPassword')}</Link>

                            </Flex>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    block
                                    loading={loading}
                                >
                                    {t('signIn')}
                                </Button>
                            </Form.Item>
                        </Form>

                        <Divider plain>{t('or', { ns: 'common' })}</Divider>

                        <Space direction="vertical" align="center" style={{ width: '100%' }}>
                            <Button block>
                                <Flex justify="center" align="center" gap="small">
                                    <GoogleOutlined />
                                    {t('ContinuewithGoogle', { ns: 'common' })}
                                </Flex>
                            </Button>

                            <Text style={{ marginTop: 16 }}>
                                {t('dontHaveAccount')}{' '}

                                <Link to="/signup">{t('registerNow')}</Link>

                            </Text>
                        </Space>
                    </Flex>
                </Card>
            </Flex>
        </ConfigProvider>
    );
};

export default LoginCard;