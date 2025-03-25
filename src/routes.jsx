import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { AppContext } from './context/AppContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import OverView from './components/Dashboards/OverView';
import ChannelsDashboard from './components/Dashboards/ChannelsDashboard';
import AddWebsite from './components/AddWebsite';
import UserManagement from './components/Dashboards/userManagment';
import NotImplementedYet from './components/NotImplementedYet';
import CampaignsDashboard from './components/Dashboards/CampaignsDashboard';
import ChatWindow from './components/ChatWindow';
import WebsiteManager from './components/WebsiteManager';
import SignupCard from './components/Auth/SignupCard';
import ForgotPasswordCard from './components/Auth/ForgotPasswordCard';
import LoginCard from './components/Auth/loginCard';
import AppLayout from './pages/AppLayout';

const AppRoutes = () => {
    const { direction, isDarkMode } = useContext(AppContext);

    return (
        <ConfigProvider
            direction={direction}
            theme={{
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                token: { colorPrimary: '#646cff' },
            }}
        >
            <AppLayout>
                <Routes>
                    {/* Unprotected Auth Routes */}
                    <Route path="/login" element={<LoginCard />} />
                    <Route path="/signup" element={<SignupCard />} />
                    <Route path="/forgotPassword" element={<ForgotPasswordCard />} />

                    {/* Protected Routes */}
                    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="/overview" element={<ProtectedRoute><OverView /></ProtectedRoute>} />
                    <Route path="/user-management" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
                    <Route path="/channels-dashboard/:website-id" element={<ProtectedRoute><ChannelsDashboard /></ProtectedRoute>}
                    />
                    <Route path="/add-website" element={<ProtectedRoute><AddWebsite /></ProtectedRoute>} />
                    <Route path="/campaigns" element={<ProtectedRoute><CampaignsDashboard /></ProtectedRoute>} />
                    <Route path="/crm" element={<ProtectedRoute><NotImplementedYet /></ProtectedRoute>} />
                    <Route path="/posts-dashboard" element={<ProtectedRoute><NotImplementedYet /></ProtectedRoute>} />
                    <Route path="/ai" element={<ProtectedRoute><NotImplementedYet /></ProtectedRoute>} />
                    <Route path="/chat/:chatid" element={<ProtectedRoute><ChatWindow /></ProtectedRoute>} />
                    <Route path="/manage-website/:websiteId" element={<ProtectedRoute><WebsiteManager /></ProtectedRoute>} />

                    {/* Redirect unknown paths */}
                    {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
                </Routes>
            </AppLayout>
        </ConfigProvider>
    );
};

export default AppRoutes;