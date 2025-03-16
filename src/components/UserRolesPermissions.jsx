import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Checkbox, Space, message } from 'antd';
import { useTranslation } from 'react-i18next';

const UserRolesPermissions = () => {
  const { t } = useTranslation('usersPage');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [roles, setRoles] = useState([
    { key: '1', role: 'admin', permissions: ['read', 'write', 'delete'] },
    { key: '2', role: 'owner', permissions: ['read', 'write'] },
    { key: '3', role: 'user', permissions: ['read'] },
  ]);
  const [form] = Form.useForm();

  const allPermissions = ['read', 'write', 'delete', 'manage'];

  const columns = [
    {
      title: t('role'),
      dataIndex: 'role',
      key: 'role',
      render: (role) => t(role),
    },
    {
      title: t('permissions'),
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions) => permissions.map((perm) => t(perm)).join(', '),
    },
    {
      title: t('actions'),
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => showEditModal(record)}>
            {t('edit')}
          </Button>
          <Button type="link" danger onClick={() => handleDeleteRole(record.key)}>
            {t('delete')}
          </Button>
        </Space>
      ),
    },
  ];

  const showEditModal = (record) => {
    setEditingRole(record);
    form.setFieldsValue({
      role: record.role,
      permissions: record.permissions,
    });
    setIsModalVisible(true);
  };

  const showAddModal = () => {
    setEditingRole(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingRole) {
        // Update existing role
        const updatedRoles = roles.map((role) =>
          role.key === editingRole.key ? { ...role, ...values } : role
        );
        setRoles(updatedRoles);
        message.success(t('roleUpdatedSuccess'));
      } else {
        // Add new role
        const newRole = {
          key: `role-${Date.now()}`, // Generate a unique key
          ...values,
        };
        setRoles([...roles, newRole]);
        message.success(t('roleAddedSuccess'));
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDeleteRole = (key) => {
    const updatedRoles = roles.filter((role) => role.key !== key);
    setRoles(updatedRoles);
    message.success(t('roleDeletedSuccess'));
  };

  return (
    <div className="roles-permissions">
      <Button
        type="primary"
        onClick={showAddModal}
        style={{ marginBottom: 16 }}
      >
        {t('addNewRole')}
      </Button>

      <Table
        columns={columns}
        dataSource={roles}
        pagination={false}
        locale={{ emptyText: t('noRoles') }}
      />

      <Modal
        title={editingRole ? t('editRole') : t('addNewRole')}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form form={form} layout="vertical" name="roleForm">
          <Form.Item
            name="role"
            label={t('roleName')}
            rules={[{ required: true, message: t('pleaseEnterRoleName') }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="permissions" label={t('permissions')}>
            <Checkbox.Group>
              <Space direction="vertical">
                {allPermissions.map((permission) => (
                  <Checkbox key={permission} value={permission}>
                    {t(permission)}
                  </Checkbox>
                ))}
              </Space>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserRolesPermissions;