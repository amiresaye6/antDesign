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
    Alert,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import enUS from 'antd/lib/locale/en_US';
import arEG from 'antd/lib/locale/ar_EG';

const { Title, Text } = Typography;

const LoginCard = ({ onLogin }) => {
    const { t, i18n } = useTranslation(['login', 'common']);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [direction, setDirection] = useState('ltr');
    const [locale, setLocale] = useState(enUS);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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

    const onFinish = async (values) => {
        setLoading(true);
        setError('');

        try {
            // Replace this with your actual authentication API call
            // For demo purposes, we're simulating an API call
            console.log('Submitting login data: ', values);

            // Simulating API response
            await new Promise(resolve => setTimeout(resolve, 1500));

            // For demo: Assume successful login and get a mock token
            const mockToken = 'mock-auth-token-' + Math.random().toString(36).substring(2);

            // Call the onLogin function passed as a prop to update auth state
            onLogin(mockToken);

            message.success(t('loginSuccessful'));
            navigate('/'); // Redirect to homepage after login
        } catch (err) {
            setError(t('loginFailed'));
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // Implement Google OAuth login
        message.info(t('googleLoginNotImplemented', { ns: 'common' }));
    };

    return (
        <ConfigProvider locale={locale} direction={direction}>
            <Flex justify="center" align="center" style={{ minHeight: '100vh' }}>
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

                        {error && <Alert message={error} type="error" style={{ marginBottom: 16, width: '100%' }} />}

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
                            <Button block onClick={handleGoogleLogin}>
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