// deprecated
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Layout, theme } from 'antd';
import SignupCard from '../components/Auth/SignupCard';
import ForgotPasswordCard from '../components/Auth/ForgotPasswordCard';
import LoginCard from '../components/Auth/loginCard';

const { Content } = Layout;

const AuthLayout = ({ direction, isDarkMode,  }) => {
  const { token } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh', direction }}>
      <Content style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: isDarkMode ? '#121212' : token.colorBgContainer,
      }}>
        <Routes>
          <Route path="/login" element={<LoginCard />} />
          <Route path="/signup" element={<SignupCard />} />
          <Route path="/forgotPassword" element={<ForgotPasswordCard />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default AuthLayout;