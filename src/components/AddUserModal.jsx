import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, message, Row, Col } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const AddUserModal = ({ visible, onCancel, onAddUser }) => {
    const { t } = useTranslation('usersPage');
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();

            const newUser = {
                ...values,
                key: `user-${Date.now()}`,
            };

            onAddUser(newUser);
            message.success(t('userAddedSuccess'));
            form.resetFields();
            onCancel();
        } catch (error) {
            console.error('Validation failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={t('addNewUser')}
            open={visible}
            onCancel={onCancel}
            footer={null}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                name="addUserForm"
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="firstName"
                            label={t('firstName')}
                            rules={[
                                { required: true, message: t('firstNameRequired') },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder={t('enterFirstName')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="lastName"
                            label={t('lastName')}
                            rules={[
                                { required: true, message: t('lastNameRequired') },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder={t('enterLastName')}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name="email"
                    label={t('email')}
                    rules={[
                        { required: true, message: t('emailRequired') },
                        { type: 'email', message: t('invalidEmail') }
                    ]}
                >
                    <Input
                        prefix={<MailOutlined />}
                        placeholder={t('enterEmail')}
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label={t('password')}
                    rules={[
                        { required: true, message: t('passwordRequired') },
                        { min: 6, message: t('passwordTooShort') }
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder={t('enterPassword')}
                    />
                </Form.Item>

                <Form.Item
                    name="role"
                    label={t('role')}
                    rules={[{ required: true, message: t('roleRequired') }]}
                >
                    <Select placeholder={t('selectRole')}>
                        <Option value="admin">{t('admin')}</Option>
                        <Option value="owner">{t('owner')}</Option>
                        <Option value="user">{t('user')}</Option>
                    </Select>
                </Form.Item>

                <Form.Item className="form-buttons">
                    <Button onClick={onCancel} style={{ marginRight: 8 }}>
                        {t('cancel')}
                    </Button>
                    <Button type="primary" onClick={handleSubmit} loading={loading}>
                        {t('submit')}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddUserModal;