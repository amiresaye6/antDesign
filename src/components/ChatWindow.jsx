import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    Layout,
    Typography,
    Input,
    Button,
    Avatar,
    Space,
    Card,
    Divider,
    Tag,
    Tooltip,
    Dropdown,
    Badge,
    List,
    Spin,
    Upload,
    Modal
} from 'antd';
import {
    SendOutlined,
    PaperClipOutlined,
    SmileOutlined,
    UserOutlined,
    CustomerServiceOutlined,
    ClockCircleOutlined,
    PhoneOutlined,
    InfoCircleOutlined,
    FileImageOutlined,
    FilePdfOutlined,
    FileTextOutlined,
    CloseOutlined,
    EllipsisOutlined,
    DownloadOutlined,
    FacebookOutlined,
    InstagramOutlined,
    WhatsAppOutlined,
    TwitterOutlined,
    MessageOutlined,
    VideoCameraOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import EmojiPicker from 'emoji-picker-react';
import GoBackButton from './GoBackButton';

const { Header, Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

// Custom TikTok icon
const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
    </svg>
);

// Channel icon function
const getChannelIcon = (channel) => {
    const iconStyle = { fontSize: '18px' };
    switch (channel?.toLowerCase()) {
        case 'facebook':
            return <FacebookOutlined style={{ ...iconStyle, color: '#1877F2' }} />;
        case 'instagram':
            return <InstagramOutlined style={{ ...iconStyle, color: '#E4405F' }} />;
        case 'whatsapp':
            return <WhatsAppOutlined style={{ ...iconStyle, color: '#25D366' }} />;
        case 'x':
        case 'twitter':
            return <TwitterOutlined style={{ ...iconStyle, color: '#1DA1F2' }} />;
        case 'tiktok':
            return <span style={{ ...iconStyle, color: 'var(--text-color)' }}><TikTokIcon /></span>;
        default:
            return <MessageOutlined style={iconStyle} />;
    }
};

// File icon function
const getFileIcon = (fileType) => {
    switch (fileType) {
        case 'image':
            return <FileImageOutlined />;
        case 'pdf':
            return <FilePdfOutlined />;
        default:
            return <FileTextOutlined />;
    }
};

// Timestamp formatter
const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
};

// Sample data
const sampleChatHistory = [
    {
        id: 1,
        sender: 'customer',
        message: 'Hello, I have a question about your product pricing options. Can you help me with a detailed quote?',
        timestamp: new Date('2025-03-20T14:30:00').getTime(),
        read: true
    },
    {
        id: 2,
        sender: 'agent',
        message: "Hello John! I'd be happy to help you with pricing information. Could you please let me know which specific products you're interested in?",
        timestamp: new Date('2025-03-20T14:32:00').getTime(),
        read: true
    },
    {
        id: 3,
        sender: 'customer',
        message: 'I’m looking at the Premium and Enterprise plans. What’s the difference between them?',
        timestamp: new Date('2025-03-20T14:35:00').getTime(),
        read: true
    },
    {
        id: 4,
        sender: 'agent',
        message: 'Great question! The main differences are:\n\n1. Premium includes up to 5 users, while Enterprise supports unlimited users.\n2. Enterprise offers dedicated support and custom integrations.\n3. Premium is $49/month, while Enterprise starts at $199/month with custom pricing for larger teams.',
        timestamp: new Date('2025-03-20T14:37:00').getTime(),
        read: true
    },
    {
        id: 5,
        sender: 'customer',
        message: 'Thanks for the information. Can you send me a detailed breakdown of all features?',
        timestamp: new Date('2025-03-20T14:40:00').getTime(),
        read: true
    },
    {
        id: 6,
        sender: 'agent',
        message: "Absolutely! I'll send you our detailed comparison sheet right away.",
        timestamp: new Date('2025-03-20T14:41:00').getTime(),
        read: true
    },
    {
        id: 7,
        sender: 'agent',
        message: "Here's our detailed pricing comparison sheet.",
        timestamp: new Date('2025-03-20T14:42:00').getTime(),
        read: true,
        attachment: {
            name: 'pricing_comparison.pdf',
            type: 'pdf',
            size: '1.2 MB',
            url: '#'
        }
    },
    {
        id: 8,
        sender: 'customer',
        message: 'This is perfect! One last question - do you offer any discounts for annual billing?',
        timestamp: new Date('2025-03-20T14:45:00').getTime(),
        read: false
    }
];

const quickReplies = [
    "Hello! How can I help you today?",
    "Thank you for contacting us. Let me check that for you.",
    "I understand your concern. Let me help you resolve this issue.",
    "Could you please provide more details about your question?",
    "I'll transfer you to a specialist who can better assist with this inquiry.",
    "Is there anything else I can help you with today?"
];

const customerInfo = {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    channel: 'Facebook',
    status: 'Active',
    history: [
        { date: '2025-03-15', issue: 'Product inquiry', status: 'Resolved' },
        { date: '2025-02-20', issue: 'Billing question', status: 'Resolved' },
        { date: '2025-01-10', issue: 'Technical support', status: 'Closed' }
    ]
};

const ChatWindow = () => {
    const { t } = useTranslation('chatWindow');
    const [messages, setMessages] = useState(sampleChatHistory);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showQuickReplies, setShowQuickReplies] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [customerInfoVisible, setCustomerInfoVisible] = useState(true);
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const handleSendMessage = useCallback(() => {
        const trimmedMessage = inputMessage.trim();
        if (!trimmedMessage && fileList.length === 0) return;

        setLoading(true);
        setTimeout(() => {
            const newMessage = {
                id: messages.length + 1,
                sender: 'agent',
                message: trimmedMessage,
                timestamp: Date.now(),
                read: false,
                ...(fileList.length > 0 && {
                    attachment: {
                        name: fileList[0].name,
                        type: fileList[0].type.split('/')[0],
                        size: `${Math.round(fileList[0].size / 1024)} KB`,
                        url: fileList[0].thumbUrl || '#'
                    }
                })
            };
            setMessages(prev => [...prev, newMessage]);
            setInputMessage('');
            setFileList([]);
            setLoading(false);
            simulateCustomerReply();
        }, 500);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputMessage, fileList, messages]);

    const simulateCustomerReply = useCallback(() => {
        if (Math.random() > 0.3) return;
        setIsTyping(true);
        typingTimeoutRef.current = setTimeout(() => {
            const customerResponses = [
                "Thanks for the information!",
                "That's helpful. I'll think about it.",
                "Could you explain a bit more?",
                "I appreciate your quick response.",
                "Perfect, that answers my question."
            ];
            const newMessage = {
                id: messages.length + 1,
                sender: 'customer',
                message: customerResponses[Math.floor(Math.random() * customerResponses.length)],
                timestamp: Date.now(),
                read: false
            };
            setMessages(prev => [...prev, newMessage]);
            setIsTyping(false);
        }, 3000);
    }, [messages]);

    const handleFileChange = useCallback(({ fileList: newFileList }) => {
        setFileList(newFileList.slice(-1)); // Ensure only one file
    }, []);

    const handleEmojiSelect = useCallback((emojiObject) => {
        setInputMessage(prev => prev + emojiObject.emoji);
        setShowEmojiPicker(false);
        inputRef.current?.focus();
    }, []);

    const handleQuickReplySelect = useCallback((reply) => {
        setInputMessage(reply);
        setShowQuickReplies(false);
        inputRef.current?.focus();
    }, []);

    const handlePreview = useCallback((file) => {
        setPreviewImage(file.url || file.thumbUrl);
        setPreviewVisible(true);
    }, []);

    return (
        <Layout style={{
            height: '100vh',
            overflow: 'hidden',
            background: 'var(--component-background)',
            color: 'var(--text-color)'
        }}>
            <Header style={{
                padding: '0 16px',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'var(--component-background)',
                height: 64
            }}>
                <GoBackButton tooltipText="Return to previous page" buttonType="primary" />
                <Space>
                    {/* <Badge dot status="success" style={{ marginRight: 8 }}> */}
                    <Avatar icon={<UserOutlined />} />
                    {/* <div> */}
                    <Title level={5} style={{ margin: 0, color: 'var(--text-color)' }}>{customerInfo.name}</Title>
                    <Space size="small">
                        {getChannelIcon(customerInfo.channel)}
                        <Text type="secondary">{customerInfo.channel}</Text>
                        <Tag color="green">{customerInfo.status}</Tag>
                    </Space>
                    {/* </Badge> */}
                    {/* </div> */}
                </Space>
                <Space>
                    <Tooltip title={t('call')}>
                        <Button icon={<PhoneOutlined />} shape="circle" aria-label={t('call')} />
                    </Tooltip>
                    <Tooltip title={t('videoCall')}>
                        <Button icon={<VideoCameraOutlined />} shape="circle" aria-label={t('videoCall')} />
                    </Tooltip>
                    <Tooltip title={t('customerInfo')}>
                        <Button
                            icon={<InfoCircleOutlined />}
                            shape="circle"
                            onClick={() => setCustomerInfoVisible(!customerInfoVisible)}
                            aria-label={t('customerInfo')}
                        />
                    </Tooltip>
                    <Dropdown
                        menu={{
                            items: [
                                { key: '1', label: t('transferChat') },
                                { key: '2', label: t('endChat') },
                                { key: '3', label: t('blockUser'), danger: true }
                            ]
                        }}
                    >
                        <Button icon={<EllipsisOutlined />} shape="circle" aria-label={t('moreOptions')} />
                    </Dropdown>
                </Space>
            </Header>
            <Layout>
                <Content style={{
                    height: 'calc(100vh - 64px)',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'var(--background-color)',
                    padding: '16px'
                }}>
                    <div style={{
                        flex: 1,
                        overflow: 'auto',
                        background: 'var(--component-background)',
                        borderRadius: 4,
                        padding: '16px',
                        border: '1px solid var(--border-color)',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}>
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                style={{
                                    display: 'flex',
                                    flexDirection: msg.sender === 'agent' ? 'row-reverse' : 'row',
                                    marginBottom: 16,
                                    alignItems: 'flex-start'
                                }}
                            >
                                <Avatar
                                    icon={msg.sender === 'agent' ? <CustomerServiceOutlined /> : <UserOutlined />}
                                    style={{
                                        background: msg.sender === 'agent' ? '#1890ff' : '#f56a00',
                                        flexShrink: 0,
                                        margin: msg.sender === 'agent' ? '0 0 0 8px' : '0 8px 0 0'
                                    }}
                                />
                                <div style={{ maxWidth: '70%' }}>
                                    <Card
                                        size="small"
                                        style={{
                                            background: msg.sender === 'agent'
                                                ? 'rgba(100, 108, 255, 0.05)'
                                                : 'rgba(0, 0, 0, 0.03)',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: 8,
                                            boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                        }}
                                        bodyStyle={{ padding: '8px 12px' }}
                                    >
                                        <Paragraph style={{ margin: 0, whiteSpace: 'pre-wrap', color: 'var(--text-color)' }}>
                                            {msg.message}
                                        </Paragraph>
                                        {msg.attachment && (
                                            <div style={{ marginTop: 8 }}>
                                                <Space>
                                                    {getFileIcon(msg.attachment.type)}
                                                    <Text>{msg.attachment.name}</Text>
                                                    <Text type="secondary">({msg.attachment.size})</Text>
                                                    <Button type="text" size="small" icon={<DownloadOutlined />} aria-label={`Download ${msg.attachment.name}`} />
                                                </Space>
                                            </div>
                                        )}
                                    </Card>
                                    <Space
                                        style={{
                                            justifyContent: msg.sender === 'agent' ? 'flex-end' : 'flex-start',
                                            width: '100%',
                                            marginTop: 4
                                        }}
                                    >
                                        <Text type="secondary" style={{ fontSize: '12px' }}>
                                            <ClockCircleOutlined style={{ marginRight: 4, color: 'var(--text-color)' }} />
                                            {formatMessageTime(msg.timestamp)}
                                        </Text>
                                        {msg.sender === 'agent' && (
                                            <Text type="secondary" style={{ fontSize: '12px' }}>
                                                {msg.read ? '• Read' : '• Sent'}
                                            </Text>
                                        )}
                                    </Space>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                                <Avatar icon={<UserOutlined />} style={{ background: '#f56a00', marginRight: 8 }} />
                                <Card
                                    size="small"
                                    style={{
                                        background: 'rgba(0, 0, 0, 0.03)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: 8,
                                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                    }}
                                    bodyStyle={{ padding: '8px 12px' }}
                                >
                                    <Spin size="small" /> <Text type="secondary">Typing...</Text>
                                </Card>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <Card
                        style={{
                            marginTop: 16,
                            border: '1px solid var(--border-color)',
                            borderRadius: 4,
                            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                            background: 'var(--component-background)'
                        }}
                        bodyStyle={{ padding: '16px' }}
                    >
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Space>
                                <Upload
                                    fileList={fileList}
                                    onChange={handleFileChange}
                                    onPreview={handlePreview}
                                    maxCount={1}
                                    beforeUpload={() => false}
                                >
                                    <Button icon={<PaperClipOutlined />} aria-label="Attach file" />
                                </Upload>
                                <Dropdown
                                    open={showQuickReplies}
                                    onOpenChange={setShowQuickReplies}
                                    dropdownRender={() => (
                                        <Card style={{
                                            width: 300,
                                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                            background: 'var(--component-background)',
                                            border: '1px solid var(--border-color)'
                                        }}>
                                            <List
                                                itemLayout="horizontal"
                                                dataSource={quickReplies}
                                                renderItem={(item) => (
                                                    <List.Item
                                                        onClick={() => handleQuickReplySelect(item)}
                                                        style={{ cursor: 'pointer', color: 'var(--text-color)' }}
                                                    >
                                                        <Text ellipsis>{item}</Text>
                                                    </List.Item>
                                                )}
                                            />
                                        </Card>
                                    )}
                                >
                                    <Button icon={<PlusOutlined />} aria-label="Quick replies" />
                                </Dropdown>
                                <Dropdown
                                    open={showEmojiPicker}
                                    onOpenChange={setShowEmojiPicker}
                                    dropdownRender={() => (
                                        <Card style={{
                                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                            background: 'var(--component-background)',
                                            border: '1px solid var(--border-color)'
                                        }}>
                                            <EmojiPicker onEmojiClick={handleEmojiSelect} />
                                        </Card>
                                    )}
                                >
                                    <Button icon={<SmileOutlined />} aria-label="Emoji picker" />
                                </Dropdown>
                            </Space>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <TextArea
                                    ref={inputRef}
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    placeholder={t('typeMessage')}
                                    autoSize={{ minRows: 1, maxRows: 4 }}
                                    onPressEnter={(e) => {
                                        if (!e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                    style={{ flex: 1 }}
                                    aria-label="Message input"
                                />
                                <Button
                                    type="primary"
                                    icon={<SendOutlined />}
                                    onClick={handleSendMessage}
                                    loading={loading}
                                    style={{ background: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}
                                    aria-label="Send message"
                                />
                            </div>
                        </Space>
                    </Card>
                </Content>
                {customerInfoVisible && (
                    <Sider
                        width={300}
                        style={{
                            background: 'var(--component-background)',
                            padding: '16px',
                            overflowY: 'auto',
                            borderLeft: '1px solid var(--border-color)'
                        }}
                    >
                        <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 16 }}>
                            <Title level={5} style={{ color: 'var(--text-color)' }}>{t('customerInfo')}</Title>
                            <Button
                                type="text"
                                icon={<CloseOutlined />}
                                onClick={() => setCustomerInfoVisible(false)}
                                size="small"
                                aria-label="Close customer info"
                            />
                        </Space>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Card
                                size="small"
                                title={t('contactDetails')}
                                style={{
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 4,
                                    background: 'var(--component-background)'
                                }}
                            >
                                <Space direction="vertical" style={{ width: '100%' }}>
                                    <div>
                                        <Text type="secondary">{t('name')}</Text>
                                        <div style={{ color: 'var(--text-color)' }}>{customerInfo.name}</div>
                                    </div>
                                    <div>
                                        <Text type="secondary">{t('email')}</Text>
                                        <div style={{ color: 'var(--text-color)' }}>{customerInfo.email}</div>
                                    </div>
                                    <div>
                                        <Text type="secondary">{t('phone')}</Text>
                                        <div style={{ color: 'var(--text-color)' }}>{customerInfo.phone}</div>
                                    </div>
                                    <div>
                                        <Text type="secondary">{t('channel')}</Text>
                                        <div>
                                            <Space>
                                                {getChannelIcon(customerInfo.channel)}
                                                <span style={{ color: 'var(--text-color)' }}>{customerInfo.channel}</span>
                                            </Space>
                                        </div>
                                    </div>
                                </Space>
                            </Card>
                            <Card
                                size="small"
                                title={t('previousInteractions')}
                                style={{
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 4,
                                    background: 'var(--component-background)'
                                }}
                            >
                                <List
                                    dataSource={customerInfo.history}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <Space direction="vertical" style={{ width: '100%' }}>
                                                <div>
                                                    <Text style={{ color: 'var(--text-color)' }}>{item.issue}</Text>
                                                    <Tag color={item.status === 'Resolved' ? 'green' : 'default'} style={{ marginLeft: 8 }}>
                                                        {item.status}
                                                    </Tag>
                                                </div>
                                                <Space>
                                                    <ClockCircleOutlined style={{ color: 'var(--text-color)' }} />
                                                    <Text type="secondary">{item.date}</Text>
                                                </Space>
                                            </Space>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                            <Card
                                size="small"
                                title={t('notes')}
                                style={{
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 4,
                                    background: 'var(--component-background)'
                                }}
                            >
                                <TextArea
                                    placeholder={t('addNotesAboutCustomer')}
                                    autoSize={{ minRows: 2, maxRows: 4 }}
                                    style={{ marginBottom: 8 }}
                                    aria-label="Customer notes"
                                />
                                <Button
                                    size="small"
                                    type="primary"
                                    style={{ background: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}
                                    aria-label="Save notes"
                                >
                                    {t('saveNotes')}
                                </Button>
                            </Card>
                        </Space>
                    </Sider>
                )}
            </Layout>
            <Modal
                open={previewVisible}
                title={fileList[0]?.name}
                footer={null}
                onCancel={() => setPreviewVisible(false)}
                style={{ background: 'var(--component-background)', border: '1px solid var(--border-color)' }}
            >
                <img alt="preview" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </Layout>
    );
};

export default ChatWindow;