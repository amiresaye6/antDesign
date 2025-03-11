// components/UserManagement/UserRolesPermissions.js
import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Checkbox } from 'antd';

const UserRolesPermissions = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Mock data - replace with your actual data source linked to roles table
  const data = [
    { key: '1', role: 'Admin', permissions: ['read', 'write', 'delete'] },
    { key: '2', role: 'Owner', permissions: ['read', 'write'] },
    { key: '3', role: 'User', permissions: ['read'] },
  ];

  const columns = [
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions) => permissions.join(', '),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button onClick={() => showEditModal(record)}>Edit</Button>
      ),
    },
  ];

  const showEditModal = (record) => {
    form.setFieldsValue({
      role: record.role,
      permissions: record.permissions,
    });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      console.log('Updated role:', values);
      // Add your update logic here
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div style={{ padding: 24 }}>
      <Button 
        type="primary" 
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Add New Role
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        style={{
          backgroundColor: 'var(--component-background)',
          color: 'var(--text-color)',
        }}
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title="Edit Role"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ color: 'var(--text-color)' }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="role"
            label="Role Name"
            rules={[{ required: true, message: 'Please enter role name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="permissions"
            label="Permissions"
            rules={[{ required: true, message: 'Please select at least one permission' }]}
          >
            <Checkbox.Group
              options={[
                { label: 'Read', value: 'read' },
                { label: 'Write', value: 'write' },
                { label: 'Delete', value: 'delete' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserRolesPermissions;