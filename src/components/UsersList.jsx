// components/UserManagement/UsersList.js
import React, { useState } from 'react';
import { Table, Input, Select, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const UsersList = () => {
  const { t } = useTranslation('usersPage');
  const [searchText, setSearchText] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  // Mock data - replace with your actual data source
  const data = [
    { key: '1', name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { key: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'owner' },
    { key: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'user' },
  ];

  const columns = [
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
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
      render: (role) => t(role)
    },
    {
      title: t('actions'),
      key: 'actions',
      // eslint-disable-next-line no-unused-vars
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">{t('edit')}</Button>
          <Button type="link" danger>{t('delete')}</Button>
        </Space>
      ),
    }
  ];

  const filteredData = data.filter(user =>
    (filterRole === 'all' || user.role === filterRole) &&
    (user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <div className="users-list">
      <div className="filter-container" style={{ marginBottom: 16 }}>
        <Space>
          <Input
            prefix={<SearchOutlined />}
            placeholder={t('searchUsers')}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />

          <Select
            defaultValue="all"
            style={{ width: 150 }}
            onChange={(value) => setFilterRole(value)}
          >
            <Option value="all">{t('allRoles')}</Option>
            <Option value="admin">{t('admin')}</Option>
            <Option value="owner">{t('owner')}</Option>
            <Option value="user">{t('user')}</Option>
          </Select>

          <Button type="primary">
            {t('addUser')}
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: t('noUsers') }}
      />
    </div>
  );
};

export default UsersList;