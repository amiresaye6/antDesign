import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginCard from './components/loginCard';
import SignupCard from './components/SignupCard';
import ForgotPasswordCard from './components/ForgotPasswordCard';
import Header from './components/Header/Header';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Content style={{ padding: '20px', background: '#f0f2f5' }}>
        <Routes>
          <Route path="/login" element={<LoginCard />} />
          <Route path="/signup" element={<SignupCard />} />
          <Route path="/forgotPassword" element={<ForgotPasswordCard />} />

        </Routes>
      </Content>
    </Layout>
  );
};


export default App;
