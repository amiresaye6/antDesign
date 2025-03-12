import React from 'react';
import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import UsersList from '../UsersList';
import UserRolesPermissions from '../UserRolesPermissions';

const UserManagement = () => {
    const { t } = useTranslation('usersPage');

    return (
        <div className="user-management-container">
            <h1>{t('userManagement')}</h1>
            <Tabs
                defaultActiveKey="1"
                items={[
                    {
                        key: '1',
                        label: t('usersList'),
                        children: <UsersList />
                    },
                    {
                        key: '2',
                        label: t('rolesPermissions'),
                        children: <UserRolesPermissions />
                    }
                ]}
            />
        </div>
    );
};

export default UserManagement;