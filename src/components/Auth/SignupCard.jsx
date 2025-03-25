import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LockOutlined,
  MailOutlined,
  SecurityScanOutlined,
  GoogleOutlined,
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
  Progress,
  Alert,
  Tag,
  Row,
  Col,
  ConfigProvider,
} from 'antd';
import enUS from 'antd/lib/locale/en_US';
import arEG from 'antd/lib/locale/ar_EG';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { signupUser } from '../../store/slices/localAuthSlice'
import { useDispatch } from 'react-redux';

const { Title, Text, Paragraph } = Typography;

const SignupCard = () => {
  const { t, i18n } = useTranslation(['signup', 'common']); // Load 'signup' and 'common' namespaces
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [passwordScore, setPasswordScore] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const [direction, setDirection] = useState('ltr');
  const [locale, setLocale] = useState(enUS);
  const dispatch = useDispatch();
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

  const calculatePasswordStrength = (password) => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[a-z]/.test(password)) score += 25;
    if (/[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) score += 25;
    return score;
  };

  const getPasswordStatus = () => {
    if (passwordScore < 25) return { color: 'exception', text: t('weak') };
    if (passwordScore < 75) return { color: 'warning', text: t('moderate') };
    return { color: 'success', text: t('strong') };
  };

  const handlePasswordChange = (e) => {
    const score = calculatePasswordStrength(e.target.value);
    setPasswordScore(score);
    setShowTips(score < 75 && e.target.value);
  };

  const onFinish = (values) => {
    const { firstName, lastName, email, password } = values;
    setLoading(true);
    dispatch(signupUser({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => {
        setLoading(false);
        form.resetFields();
        message.success(t('accountCreated'), 1).then(() => {
          navigate('/login');
        });
      })
      .catch((error) => {
        setLoading(false);
        if (error === 'Email already registered') {
          message.error(t('emailAlreadyRegistered'));
        } else {
          message.error(t('signupFailed'));
        }
      });
  };

  return (
    <ConfigProvider locale={locale} direction={direction}>
      <Flex justify="center" align="center" style={{ minHeight: '100vh' }}>
        <Card
          style={{
            width: 440,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            borderRadius: '12px',
          }}
        >
          <Flex vertical align="center" gap="small">
            <Title level={2} style={{ marginBottom: 0 }}>{t('joinUs')}</Title>
            <Text type="secondary" style={{ marginBottom: 24 }}>{t('createAccount')}</Text>

            <Form
              form={form}
              name="register"
              layout="vertical"
              initialValues={{ agreement: true }}
              style={{ width: '100%' }}
              onFinish={onFinish}
              requiredMark="optional"
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="firstName"
                    label={t('firstName')}
                    rules={[{ required: true, message: t('required', { ns: 'common' }) }]}
                  >
                    <Input size="large" placeholder={t('placeholderFirstName', { ns: 'common' })} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="lastName"
                    label={t('lastName')}
                    rules={[{ required: true, message: t('required', { ns: 'common' }) }]}
                  >
                    <Input size="large" placeholder={t('placeholderLastName', { ns: 'common' })} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="email"
                label={t('email', { ns: 'common' })}
                rules={[
                  { required: true, message: t('required', { ns: 'common' }) },
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
                label={
                  <Flex align="center" justify="space-between" style={{ width: '100%' }}>
                    <span>{t('password', { ns: 'common' })}</span>
                    {passwordScore > 0 && (
                      <Tag color={getPasswordStatus().color}>{getPasswordStatus().text}</Tag>
                    )}
                  </Flex>
                }
                rules={[
                  { required: true, message: t('required', { ns: 'common' }) },
                  { min: 8, message: t('passwordLength') },
                ]}
                help={
                  passwordScore > 0 && (
                    <Progress
                      percent={passwordScore}
                      size="small"
                      status={getPasswordStatus().color}
                      showInfo={false}
                    />
                  )
                }
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder={t('passwordPlaceholder', { ns: 'common' })}
                  size="large"
                  onChange={handlePasswordChange}
                />
              </Form.Item>

              {showTips && (
                <Alert
                  message={t('passwordRecommendations')}
                  description={
                    <ul
                      style={{
                        paddingLeft: i18n.language === 'en' ? 20 : 0,
                        paddingRight: i18n.language === 'ar' ? 20 : 0,
                        marginBottom: 0,
                      }}
                    >
                      <li>{t('passwordLength')}</li>
                      <li>{t('passwordUpperLower')}</li>
                      <li>{t('passwordSpecial')}</li>
                    </ul>
                  }
                  type="info"
                  showIcon
                  icon={<SecurityScanOutlined />}
                  style={{ marginBottom: 16 }}
                />
              )}

              <Form.Item
                name="confirmPassword"
                label={t('confirmPassword')}
                dependencies={['password']}
                rules={[
                  { required: true, message: t('required', { ns: 'common' }) },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error(t('passwordsDoNotMatch')));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder={t('confirmPasswordPlaceholder')}
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(new Error(t('mustAcceptTerms'))),
                  },
                ]}
              >
                <Checkbox>
                  {t('termsAgreement')} <Link to="termsOfservice">{t('termsOfService')}</Link> {t('and')}{' '}
                  <Link to="privacyPolicy">{t('privacyPolicy')}</Link>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block loading={loading}>
                  {t('createAccountButton')}
                </Button>
              </Form.Item>
            </Form>

            <Divider>
              <Text type="secondary">{t('orSignUpWith')}</Text>
            </Divider>

            <Space size="middle" style={{ marginBottom: 16 }}>
              <Button block>
                <Flex justify="center" align="center" gap="small">
                  <GoogleOutlined />
                  {t('ContinuewithGoogle')}
                </Flex>
              </Button>
            </Space>

            <Paragraph>
              {t('alreadyHaveAccount')} <Link strong to="/login">{t('signIn')}</Link>
            </Paragraph>
          </Flex>
        </Card>
      </Flex>
    </ConfigProvider>
  );
};

export default SignupCard;