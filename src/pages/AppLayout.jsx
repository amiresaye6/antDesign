import React, { useContext } from 'react';
import { Layout, theme } from 'antd';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Navigation from '../components/Navigation';
import HeaderComponent from '../components/Header';

const { Content } = Layout;

const AppLayout = ({ children }) => {
    const { isAuthenticated, direction, collapsed, setCollapsed, isDarkMode, toggleTheme, i18n, handleLanguageChange, logout } = useContext(AppContext);
    const { token } = theme.useToken();
    const location = useLocation();

    // Define auth-related paths where header/sidebar should NOT be shown
    const isAuthPath = ['/login', '/signup', '/forgotPassword'].includes(location.pathname);

    return (
        <Layout style={{ minHeight: '100vh', direction }}>
            {/* Show Navigation/Sidebar only for authenticated users and non-auth paths */}
            {isAuthenticated && !isAuthPath && (
                <Navigation
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    currentPath={location.pathname}
                    onLogout={logout}
                />
            )}
            <Layout
                className={`${!isAuthPath ? 'site-layout' : ''} ${
                    collapsed && isAuthenticated && !isAuthPath ? 'collapsed' : ''
                }`}
            >
                {/* Show Header only for authenticated users and non-auth paths */}
                {isAuthenticated && !isAuthPath && (
                    <HeaderComponent
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                        isDarkMode={isDarkMode}
                        toggleTheme={toggleTheme}
                        i18n={i18n}
                        handleLanguageChange={handleLanguageChange}
                        token={token}
                        onLogout={logout}
                    />
                )}
                <Content
                    style={{
                        margin: isAuthenticated && !isAuthPath ? '24px 16px' : 0,
                        padding: isAuthenticated && !isAuthPath ? 24 : 0,
                        minHeight: 280,
                        background: isDarkMode ? '#121212' : token.colorBgContainer,
                        borderRadius: isAuthenticated && !isAuthPath ? token.borderRadiusLG : 0,
                        transition: 'background-color 0.3s',
                        display: isAuthPath ? 'flex' : 'block',
                        justifyContent: isAuthPath ? 'center' : 'flex-start',
                        alignItems: isAuthPath ? 'center' : 'flex-start',
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;