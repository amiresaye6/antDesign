// components/UserManagement/UsersList.js
import React, { useState } from 'react';
import { Table, Input, Select, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const UsersList = () => {
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
  ];

  const filteredData = data.filter(user => 
    (filterRole === 'all' || user.role === filterRole) &&
    (user.name.toLowerCase().includes(searchText.toLowerCase()) ||
     user.email.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" style={{ width: '100%', marginBottom: 16 }}>
        <Space>
          <Input
            placeholder="Search users..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          <Select
            defaultValue="all"
            style={{ width: 120 }}
            onChange={(value) => setFilterRole(value)}
          >
            <Option value="all">All Roles</Option>
            <Option value="admin">Admin</Option>
            <Option value="owner">Owner</Option>
            <Option value="user">User</Option>
          </Select>
        </Space>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredData}
        style={{
          backgroundColor: 'var(--component-background)',
          color: 'var(--text-color)',
        }}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default UsersList;