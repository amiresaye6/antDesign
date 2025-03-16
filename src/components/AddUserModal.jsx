import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
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

            // Generate a unique key (in a real app, this would come from the backend)
            const newUser = {
                ...values,
                key: `user-${Date.now()}`,
            };

            // Call the parent handler to add the user to the list
            onAddUser(newUser);

            // Success message
            message.success(t('userAddedSuccess'));

            // Reset form and close modal
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
                <Form.Item
                    name="name"
                    label={t('name')}
                    rules={[
                        { required: true, message: t('nameRequired') },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined />}
                        placeholder={t('enterName')}
                    />
                </Form.Item>

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