import React from 'react';
import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import UsersList from '../components/UsersList';
import UserRolesPermissions from '../components/UserRolesPermissions';


const UserManagement = () => {
  const { t } = useTranslation('common');
  return (
    <Tabs
      defaultActiveKey="1"
      items={[
        {
          key: '1',
          label: t('usersList'),
          children: <UsersList />,
        },
        {
          key: '2',
          label: t('rolesPermissions'),
          children: <UserRolesPermissions />,
        },
      ]}
    />
  );
};

export default UserManagement;
