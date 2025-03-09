import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MailOutlined,
  KeyOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Flex,
  Card,
  Typography,
  Steps,
  Result,
  message,
  ConfigProvider,
} from 'antd';
import { Link } from 'react-router-dom';
import enUS from 'antd/lib/locale/en_US';
import arEG from 'antd/lib/locale/ar_EG';

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

const ForgotPasswordCard = () => {
  const { t, i18n } = useTranslation(['forgotPassword', 'common']); // Load 'forgotPassword' and 'common' namespaces
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
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

  const handleRequestReset = (values) => {
    setLoading(true);
    setEmail(values.email);

    setTimeout(() => {
      setLoading(false);
      setCurrentStep(1);
      message.success(t('resetLinkSent'));
    }, 1500);
  };

  const handleVerifyCode = (values) => {
    setLoading(true);
    console.log(values);

    setTimeout(() => {
      setLoading(false);
      setCurrentStep(2);
    }, 1500);
  };

  const handleResetPassword = (values) => {
    setLoading(true);
    console.log(values);

    setTimeout(() => {
      setLoading(false);
      setCurrentStep(3);
    }, 1500);
  };

  const goToLogin = () => {
    console.log('Navigate to login page');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Form
            form={form}
            name="requestReset"
            layout="vertical"
            onFinish={handleRequestReset}
          >
            <Form.Item
              name="email"
              label={t('emailLabel')}
              rules={[
                { required: true, message: t('pleaseEnterEmail') },
                { type: 'email', message: t('pleaseEnterValidEmail') },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder={t('emailPlaceholder', { ns: 'common' })}
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
              >
                {t('requestPasswordReset')}
              </Button>
            </Form.Item>

            <Flex justify="center">
              <Button type="link" onClick={goToLogin}>
                <Flex align="center" gap="small">
                  <ArrowLeftOutlined />
                  <Link to="/login">{t('backToLogin')}</Link>
                </Flex>
              </Button>
            </Flex>
          </Form>
        );

      case 1:
        return (
          <Form
            form={form}
            name="verifyCode"
            layout="vertical"
            onFinish={handleVerifyCode}
          >
            <Paragraph>
              <span
                dangerouslySetInnerHTML={{
                  __html: t('verificationSent', { email }),
                }}
              />
            </Paragraph>

            <Form.Item
              name="code"
              label={t('verificationCodeLabel')}
              rules={[
                { required: true, message: t('pleaseEnterCode') },
                { len: 6, message: t('codeMustBe6Digits') },
              ]}
            >
              <Input
                size="large"
                placeholder={t('verificationCodePlaceholder')}
                maxLength={6}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
              >
                {t('verifyCode')}
              </Button>
            </Form.Item>

            <Flex justify="center">
              <Button type="link" onClick={() => setCurrentStep(0)}>
                <Flex align="center" gap="small">
                  <ArrowLeftOutlined />
                  {t('back')}
                </Flex>
              </Button>
            </Flex>
          </Form>
        );

      case 2:
        return (
          <Form
            form={form}
            name="resetPassword"
            layout="vertical"
            onFinish={handleResetPassword}
          >
            <Form.Item
              name="newPassword"
              label={t('newPasswordLabel')}
              rules={[
                { required: true, message: t('pleaseCreateNewPassword') },
                { min: 8, message: t('passwordMinLength') },
              ]}
            >
              <Input.Password
                prefix={<KeyOutlined />}
                placeholder={t('newPasswordPlaceholder')}
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label={t('confirmPasswordLabel')}
              dependencies={['newPassword']}
              rules={[
                { required: true, message: t('pleaseConfirmPassword') },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(t('passwordsDoNotMatch')));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<KeyOutlined />}
                placeholder={t('confirmPasswordPlaceholder')}
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
              >
                {t('resetPasswordButton')}
              </Button>
            </Form.Item>

            <Flex justify="center">
              <Button type="link" onClick={() => setCurrentStep(1)}>
                <Flex align="center" gap="small">
                  <ArrowLeftOutlined />
                  {t('back')}
                </Flex>
              </Button>
            </Flex>
          </Form>
        );

      case 3:
        return (
          <Result
            status="success"
            title={t('passwordResetSuccessful')}
            subTitle={t('passwordResetSubTitle')}
            extra={[
              <Button type="primary" size="large" key="login" onClick={goToLogin}>
                <Link to="/login">{t('returnToLogin')}</Link>
              </Button>,
            ]}
          />
        );

      default:
        return null;
    }
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
            <Title level={2} style={{ marginBottom: 0 }}>{t('resetPassword')}</Title>
            <Text type="secondary" style={{ marginBottom: 8 }}>{t('followSteps')}</Text>

            <Steps
              current={currentStep}
              size="small"
              style={{ width: '100%', marginBottom: 24 }}
              items={[
                { title: t('request') },
                { title: t('verify') },
                { title: t('reset') },
              ]}
            />

            {renderStepContent()}
          </Flex>
        </Card>
      </Flex>
    </ConfigProvider>
  );
};

export default ForgotPasswordCard;