import React, { useState } from 'react';
import { Table, Input, Select, Button, Space, message, Modal, Form } from 'antd';
import { SearchOutlined, UserAddOutlined, EditOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import AddUserModal from './AddUserModal';

const { Option } = Select;

const UsersList = () => {
  const { t } = useTranslation('usersPage');
  const [searchText, setSearchText] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm] = Form.useForm();

  const [userData, setUserData] = useState([
    { key: '1', name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { key: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'owner' },
    { key: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'user' },
    { key: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'admin' },
    { key: '5', name: 'Charlie Davis', email: 'charlie@example.com', role: 'owner' },
    { key: '6', name: 'Eve White', email: 'eve@example.com', role: 'user' },
  ]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setEditingUser(null);
    editForm.resetFields();
  };

  const handleAddUser = (newUser) => {
    setUserData([...userData, newUser]);
  };

  const handleDelete = (key) => {
    const updatedData = userData.filter(user => user.key !== key);
    setUserData(updatedData);
    message.success(t('userDeleted'));
  };

  const handleEdit = (record) => {
    setEditingUser(record);
    setIsEditModalVisible(true);
    editForm.setFieldsValue({
      name: record.name,
      email: record.email,
      role: record.role,
    });
  };

  const handleEditUser = (values) => {
    setUserData(userData.map(user =>
      user.key === editingUser.key
        ? { ...user, ...values }
        : user
    ));
    setIsEditModalVisible(false);
    setEditingUser(null);
    editForm.resetFields();
    message.success(t('userUpdated'));
  };

  const columns = [
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('role'),
      dataIndex: 'role',
      key: 'role',
      render: (role) => t(role),
      filters: [
        { text: t('admin'), value: 'admin' },
        { text: t('owner'), value: 'owner' },
        { text: t('user'), value: 'user' },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: t('actions'),
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            {t('edit')}
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDelete(record.key)}
          >
            {t('delete')}
          </Button>
        </Space>
      ),
    }
  ];

  const filteredData = userData.filter(user =>
    (filterRole === 'all' || user.role === filterRole) &&
    (user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <div className="users-list">
      <div className="filter-container" style={{ marginBottom: 16 }}>
        <Space wrap>
          <Input
            prefix={<SearchOutlined />}
            placeholder={t('searchUsers')}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
            allowClear
          />

          <Select
            value={filterRole}
            style={{ width: 150 }}
            onChange={(value) => setFilterRole(value)}
          >
            <Option value="all">{t('allRoles')}</Option>
            <Option value="admin">{t('admin')}</Option>
            <Option value="owner">{t('owner')}</Option>
            <Option value="user">{t('user')}</Option>
          </Select>

          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={showModal}
          >
            {t('addUser')}
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: t('noUsers') }}
        rowKey="key"
        bordered
      />

      <AddUserModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onAddUser={handleAddUser}
      />

      {/* Edit User Modal */}
      <Modal
        title={t('editUser')}
        open={isEditModalVisible}
        onCancel={handleEditCancel}
        footer={[
          <Button key="cancel" onClick={handleEditCancel}>
            {t('cancel')}
          </Button>,
          <Button key="submit" type="primary" onClick={() => editForm.submit()}>
            {t('save')}
          </Button>,
        ]}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleEditUser}
        >
          <Form.Item
            name="name"
            label={t('name')}
            rules={[{ required: true, message: t('nameRequired') }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label={t('email')}
            rules={[
              { required: true, message: t('emailRequired') },
              { type: 'email', message: t('invalidEmail') },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label={t('role')}
            rules={[{ required: true, message: t('roleRequired') }]}
          >
            <Select>
              <Option value="admin">{t('admin')}</Option>
              <Option value="owner">{t('owner')}</Option>
              <Option value="user">{t('user')}</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersList;