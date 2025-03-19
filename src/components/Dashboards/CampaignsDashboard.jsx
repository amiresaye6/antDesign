import React, { useState } from 'react';
import {
    Table,
    Tag,
    Space,
    Typography,
    Card,
    Row,
    Col,
    Dropdown,
    Button,
    Avatar,
    Input,
    Select,
    Statistic,
    Modal,
    Form,
    DatePicker,
    Upload,
    Checkbox,
    Tabs,
    Progress,
    Radio,
    Menu,
    Divider,
    Tooltip,
    message
} from 'antd';
import {
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
    DownloadOutlined,
    UploadOutlined,
    SendOutlined,
    CalendarOutlined,
    TagOutlined,
    FilterOutlined,
    DeleteOutlined,
    EditOutlined,
    MoreOutlined,
    AreaChartOutlined,
    InboxOutlined,
    EyeOutlined,
    CloseCircleOutlined,
    StopOutlined,
    FacebookOutlined,
    InstagramOutlined,
    WhatsAppOutlined,
    TwitterOutlined,
    FileExcelOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Line, Pie } from '@ant-design/charts';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { Dragger } = Upload;
const { RangePicker } = DatePicker;

// Custom TikTok icon
const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
    </svg>
);

// Get channel icon based on channel name
const getChannelIcon = (channel) => {
    const iconStyle = { fontSize: '18px' };
    switch (channel?.toLowerCase()) {
        case 'facebook': return <FacebookOutlined style={{ ...iconStyle, color: '#1877F2' }} />;
        case 'instagram': return <InstagramOutlined style={{ ...iconStyle, color: '#E4405F' }} />;
        case 'whatsapp': return <WhatsAppOutlined style={{ ...iconStyle, color: '#25D366' }} />;
        case 'x':
        case 'twitter': return <TwitterOutlined style={{ ...iconStyle, color: '#1DA1F2' }} />;
        case 'tiktok': return <span style={{ ...iconStyle, color: '#000000' }}><TikTokIcon /></span>;
        case 'email': return <MailOutlined style={{ ...iconStyle, color: '#808080' }} />;
        case 'sms': return <PhoneOutlined style={{ ...iconStyle, color: '#808080' }} />;
        default: return <PhoneOutlined style={iconStyle} />;
    }
};

// Get status color
const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
        case 'new': case 'جديد': return 'blue';
        case 'active': case 'نشط': return 'green';
        case 'unsubscribed': case 'إلغاء الاشتراك': return 'red';
        case 'lead': case 'عميل محتمل': return 'purple';
        case 'customer': case 'عميل': return 'green';
        case 'vip': return 'gold';
        default: return 'default';
    }
};

// Format date
const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
};

// Test data for contacts
const contactsData = [
    { id: '1', name: 'John Smith', email: 'john.smith@example.com', phone: '+1 (555) 123-4567', channel: 'Facebook', tags: ['Lead', 'Interested'], status: 'New', date: new Date('2025-01-15').getTime() },
    { id: '2', name: 'Maria Rodriguez', email: 'maria.r@example.com', phone: '+1 (555) 987-6543', channel: 'WhatsApp', tags: ['Customer', 'VIP'], status: 'Active', date: new Date('2024-11-07').getTime() },
    { id: '3', name: 'David Chen', email: 'dchen@example.com', phone: '+1 (555) 456-7890', channel: 'Instagram', tags: ['Lead'], status: 'Unsubscribed', date: new Date('2024-12-25').getTime() },
    { id: '4', name: 'Priya Sharma', email: 'priya.s@example.com', phone: '+1 (555) 234-5678', channel: 'TikTok', tags: ['Customer'], status: 'Active', date: new Date('2025-02-19').getTime() },
    { id: '5', name: 'Alex Johnson', email: 'a.johnson@example.com', phone: '+1 (555) 789-0123', channel: 'Email', tags: ['Lead', 'Cold'], status: 'New', date: new Date('2025-03-06').getTime() },
    { id: '6', name: 'Sarah Williams', email: 'sarah.w@example.com', phone: '+1 (555) 321-7654', channel: 'SMS', tags: ['Customer'], status: 'Active', date: new Date('2025-01-30').getTime() },
    { id: '7', name: 'Mohammed Al-Farsi', email: 'malfarsi@example.com', phone: '+1 (555) 111-2233', channel: 'WhatsApp', tags: ['VIP', 'Customer'], status: 'Active', date: new Date('2024-10-12').getTime() },
];

// Test data for campaigns
const campaignsData = [
    { id: '1', name: 'Spring Sale Promotion', channel: 'WhatsApp', sent: 2500, delivered: 2350, read: 1890, failed: 150, unsubscribed: 75, date: new Date('2025-03-01').getTime(), status: 'Completed' },
    { id: '2', name: 'New Product Launch', channel: 'Email', sent: 5000, delivered: 4800, read: 3200, failed: 200, unsubscribed: 120, date: new Date('2025-02-15').getTime(), status: 'Completed' },
    { id: '3', name: 'Customer Feedback Survey', channel: 'SMS', sent: 1000, delivered: 950, read: 680, failed: 50, unsubscribed: 30, date: new Date('2025-03-10').getTime(), status: 'In Progress' },
    { id: '4', name: 'Holiday Special Offer', channel: 'Multiple', sent: 3500, delivered: 3300, read: 2500, failed: 200, unsubscribed: 95, date: new Date('2024-12-20').getTime(), status: 'Completed' },
];

const CampaignsDashboard = () => {
    const { t } = useTranslation('campaigns');
    const [contacts, setContacts] = useState(contactsData);
    // eslint-disable-next-line no-unused-vars
    const [campaigns, setCampaigns] = useState(campaignsData);
    const [searchText, setSearchText] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedChannel, setSelectedChannel] = useState('All');
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [messageModalVisible, setMessageModalVisible] = useState(false);
    const [uploadModalVisible, setUploadModalVisible] = useState(false);
    const [exportModalVisible, setExportModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editingContact, setEditingContact] = useState(null);
    const [form] = Form.useForm();
    const [uploadForm] = Form.useForm();
    const [editForm] = Form.useForm();

    // Handle contact actions
    const handleContactAction = (key, record) => {
        if (key === 'edit') {
            setEditingContact(record);
            setEditModalVisible(true);
            editForm.setFieldsValue({
                name: record.name,
                email: record.email,
                phone: record.phone,
                channel: record.channel,
                tags: record.tags,
                status: record.status,
            });
        } else if (key === 'delete') {
            setContacts(contacts.filter(contact => contact.id !== record.id));
            message.success(t('contactDeleted'));
        }
    };

    // Handle edit contact submission
    const handleEditContact = (values) => {
        setContacts(contacts.map(contact => 
            contact.id === editingContact.id 
                ? { ...contact, ...values }
                : contact
        ));
        setEditModalVisible(false);
        setEditingContact(null);
        editForm.resetFields();
        message.success(t('contactUpdated'));
    };

    // More actions menu items for contacts
    const contactsActions = (record) => ({
        items: [
            { key: 'edit', label: t('editContact'), icon: <EditOutlined /> },
            { key: 'delete', label: t('deleteContact'), icon: <DeleteOutlined />, danger: true },
        ],
        onClick: ({ key }) => handleContactAction(key, record)
    });

    // Filter contacts
    const filteredContacts = contacts.filter(item => {
        const matchesSearch = searchText === '' ||
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.email.toLowerCase().includes(searchText.toLowerCase()) ||
            item.phone.includes(searchText);
        const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
        const matchesChannel = selectedChannel === 'All' || item.channel === selectedChannel;
        const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => item.tags.includes(tag));
        return matchesSearch && matchesStatus && matchesChannel && matchesTags;
    });

    // Contact table columns
    const contactColumns = [
        { title: t('name'), dataIndex: 'name', key: 'name', render: (name) => (<Space><Avatar icon={<UserOutlined />} /><Text strong>{name}</Text></Space>) },
        { title: t('email'), dataIndex: 'email', key: 'email', render: (email) => (<Space><MailOutlined style={{ color: '#8c8c8c' }} /><Text>{email}</Text></Space>) },
        { title: t('phone'), dataIndex: 'phone', key: 'phone', render: (phone) => (<Space><PhoneOutlined style={{ color: '#8c8c8c' }} /><Text>{phone}</Text></Space>) },
        { title: t('channel'), dataIndex: 'channel', key: 'channel', render: (channel) => (<Space>{getChannelIcon(channel)}<Text>{channel}</Text></Space>) },
        { title: t('tags'), dataIndex: 'tags', key: 'tags', render: (tags) => (<Space>{tags.map(tag => (<Tag key={tag} color={tag === 'VIP' ? 'gold' : tag === 'Customer' ? 'green' : 'blue'}>{tag}</Tag>))}</Space>) },
        { title: t('status'), dataIndex: 'status', key: 'status', render: (status) => (<Tag color={getStatusColor(status)}>{status}</Tag>) },
        { title: t('dateAdded'), dataIndex: 'date', key: 'date', render: (date) => formatDate(date) },
        { title: t('actions'), key: 'actions', render: (_, record) => (<Dropdown menu={contactsActions(record)} placement="bottomRight"><Button type="text" icon={<MoreOutlined />} /></Dropdown>) },
    ];

    // Campaign table columns
    const campaignColumns = [
        { title: t('campaignName'), dataIndex: 'name', key: 'name' },
        { title: t('channel'), dataIndex: 'channel', key: 'channel', render: (channel) => (<Space>{channel === 'Multiple' ? <Space>{getChannelIcon('WhatsApp')}{getChannelIcon('Email')}{getChannelIcon('SMS')}</Space> : getChannelIcon(channel)}<Text>{channel}</Text></Space>) },
        { title: t('sent'), dataIndex: 'sent', key: 'sent' },
        { title: t('delivered'), dataIndex: 'delivered', key: 'delivered', render: (delivered, record) => (<Space><Text>{delivered}</Text><Text type="secondary">({Math.round(delivered / record.sent * 100)}%)</Text></Space>) },
        { title: t('read'), dataIndex: 'read', key: 'read', render: (read, record) => (<Space><Text>{read}</Text><Text type="secondary">({Math.round(read / record.sent * 100)}%)</Text></Space>) },
        { title: t('failed'), dataIndex: 'failed', key: 'failed' },
        { title: t('date'), dataIndex: 'date', key: 'date', render: (date) => formatDate(date) },
        { title: t('status'), dataIndex: 'status', key: 'status', render: (status) => (<Tag color={status === 'Completed' ? 'green' : 'blue'}>{status}</Tag>) },
    ];

    // Row selection config
    const rowSelection = {
        selectedRowKeys: selectedContacts,
        onChange: (selectedRowKeys) => setSelectedContacts(selectedRowKeys),
    };

    // Handlers
    const handleSendMessage = (values) => {
        console.log('Send message:', values);
        setMessageModalVisible(false);
        form.resetFields();
        message.success(t('messageSent'));
    };

    const handleUploadContacts = (values) => {
        console.log('Upload contacts:', values);
        setUploadModalVisible(false);
        uploadForm.resetFields();
        message.success(t('contactsUploaded'));
    };

    const handleExportContacts = (values) => {
        console.log('Export contacts:', values);
        setExportModalVisible(false);
        message.success(t('contactsExported'));
    };

    // Chart data
    const performanceData = campaignsData.flatMap(campaign => [
        { date: formatDate(campaign.date), type: 'sent', value: campaign.sent },
        { date: formatDate(campaign.date), type: 'delivered', value: campaign.delivered },
        { date: formatDate(campaign.date), type: 'read', value: campaign.read },
    ]);

    const engagementData = [
        { type: t('read'), value: 70 },
        { type: t('unread'), value: 20 },
        { type: t('failed'), value: 10 },
    ];

    return (
        <>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Row gutter={24} align="middle">
                    <Col xs={24} sm={12}><Title level={4}>{t('dashboardTitle')}</Title></Col>
                    <Col xs={24} sm={12}>
                        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                            <Button type="primary" icon={<SendOutlined />} onClick={() => setMessageModalVisible(true)} disabled={selectedContacts.length === 0}>{t('sendMessage')}</Button>
                            <Button icon={<UploadOutlined />} onClick={() => setUploadModalVisible(true)}>{t('uploadContacts')}</Button>
                            <Button icon={<DownloadOutlined />} onClick={() => setExportModalVisible(true)}>{t('exportContacts')}</Button>
                        </Space>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Card>
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Title level={5}>{t('campaignsOverview')}</Title>
                                <Row gutter={16}>
                                    <Col xs={12} sm={8} md={4}><Card size="small"><Statistic title={t('totalCampaigns')} value={campaigns.length} /></Card></Col>
                                    <Col xs={12} sm={8} md={4}><Card size="small"><Statistic title={t('totalSent')} value={campaigns.reduce((sum, campaign) => sum + campaign.sent, 0)} /></Card></Col>
                                    <Col xs={12} sm={8} md={4}><Card size="small"><Statistic title={t('delivered')} value={campaigns.reduce((sum, campaign) => sum + campaign.delivered, 0)} /></Card></Col>
                                    <Col xs={12} sm={8} md={4}><Card size="small"><Statistic title={t('read')} value={campaigns.reduce((sum, campaign) => sum + campaign.read, 0)} /></Card></Col>
                                    <Col xs={12} sm={8} md={4}><Card size="small"><Statistic title={t('failed')} value={campaigns.reduce((sum, campaign) => sum + campaign.failed, 0)} /></Card></Col>
                                    <Col xs={12} sm={8} md={4}><Card size="small"><Statistic title={t('unsubscribed')} value={campaigns.reduce((sum, campaign) => sum + campaign.unsubscribed, 0)} /></Card></Col>
                                </Row>
                            </Space>
                        </Card>
                    </Col>
                </Row>

                <Tabs defaultActiveKey="contacts">
                    <TabPane tab={t('contacts')} key="contacts">
                        <Card>
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Row gutter={16} align="middle">
                                    <Col xs={24} md={12}>
                                        <Search placeholder={t('searchPlaceholder')} allowClear onSearch={value => setSearchText(value)} onChange={e => setSearchText(e.target.value)} style={{ width: '100%' }} />
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Space wrap style={{ width: '100%', justifyContent: 'flex-end' }}>
                                            <Select placeholder={t('selectChannel')} style={{ width: 120 }} onChange={value => setSelectedChannel(value)} defaultValue="All">
                                                <Option value="All">{t('allChannels')}</Option>
                                                <Option value="Facebook">Facebook</Option>
                                                <Option value="Instagram">Instagram</Option>
                                                <Option value="WhatsApp">WhatsApp</Option>
                                                <Option value="Email">Email</Option>
                                                <Option value="SMS">SMS</Option>
                                                <Option value="TikTok">TikTok</Option>
                                                <Option value="X">X</Option>
                                            </Select>
                                            <Select placeholder={t('selectStatus')} style={{ width: 120 }} onChange={value => setSelectedStatus(value)} defaultValue="All">
                                                <Option value="All">{t('allStatus')}</Option>
                                                <Option value="New">{t('new')}</Option>
                                                <Option value="Active">{t('active')}</Option>
                                                <Option value="Unsubscribed">{t('unsubscribed')}</Option>
                                            </Select>
                                            <Select placeholder={t('selectTags')} mode="multiple" style={{ width: 200 }} onChange={values => setSelectedTags(values)} allowClear>
                                                <Option value="Lead">{t('lead')}</Option>
                                                <Option value="Customer">{t('customer')}</Option>
                                                <Option value="VIP">{t('vip')}</Option>
                                                <Option value="Interested">{t('interested')}</Option>
                                                <Option value="Cold">{t('cold')}</Option>
                                            </Select>
                                        </Space>
                                    </Col>
                                </Row>
                                <Table rowSelection={rowSelection} columns={contactColumns} dataSource={filteredContacts} rowKey="id" pagination={{ pageSize: 10 }} scroll={{ x: 'max-content' }} />
                            </Space>
                        </Card>
                    </TabPane>
                    <TabPane tab={t('campaigns')} key="campaigns">
                        <Card>
                            <Row gutter={[16, 16]}>
                                <Col xs={24} lg={12}>
                                    <Card title={t('campaignPerformance')} size="small">
                                        <Line
                                            data={performanceData}
                                            xField="date"
                                            yField="value"
                                            seriesField="type"
                                            height={300}
                                            legend={{ position: 'top' }}
                                            meta={{
                                                value: { alias: t('count') },
                                            }}
                                        />
                                    </Card>
                                </Col>
                                <Col xs={24} lg={12}>
                                    <Card title={t('engagementRate')} size="small">
                                        <Pie
                                            data={engagementData}
                                            angleField="value"
                                            colorField="type"
                                            radius={0.8}
                                            label={{ type: 'outer', content: '{name} {percentage}' }}
                                            interactions={[{ type: 'element-selected' }, { type: 'element-active' }]}
                                            height={300}
                                        />
                                    </Card>
                                </Col>
                                <Col span={24}>
                                    <Table columns={campaignColumns} dataSource={campaigns} rowKey="id" pagination={{ pageSize: 5 }} scroll={{ x: 'max-content' }} />
                                </Col>
                            </Row>
                        </Card>
                    </TabPane>
                </Tabs>
            </Space>

            {/* Send Message Modal */}
            <Modal
                title={t('sendMessage')}
                open={messageModalVisible}
                onCancel={() => setMessageModalVisible(false)}
                footer={[
                    <Button key="back" onClick={() => setMessageModalVisible(false)}>{t('cancel')}</Button>,
                    <Button key="submit" type="primary" onClick={() => form.submit()}>{t('send')}</Button>,
                ]}
                width={600}
            >
                <Form form={form} layout="vertical" onFinish={handleSendMessage}>
                    <Form.Item name="selectedContacts" label={t('selectedContacts')} initialValue={selectedContacts.length}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="channel" label={t('channel')} rules={[{ required: true, message: t('selectChannelRequired') }]}>
                        <Select placeholder={t('selectChannel')}>
                            <Option value="WhatsApp">WhatsApp</Option>
                            <Option value="SMS">SMS</Option>
                            <Option value="Email">Email</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="template" label={t('template')}>
                        <Select placeholder={t('selectTemplate')}>
                            <Option value="welcome">Welcome Message</Option>
                            <Option value="promotion">Promotion Announcement</Option>
                            <Option value="reminder">Appointment Reminder</Option>
                            <Option value="custom">{t('custom')}</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="message" label={t('message')} rules={[{ required: true, message: t('messageRequired') }]}>
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item name="schedule" label={t('schedule')}>
                        <Form.Item name="schedule" initialValue="now">
                            <Radio.Group>
                                <Space direction="vertical">
                                    <Radio value="now">{t('sendNow')}</Radio>
                                    <Radio value="later">
                                        {t('scheduleLater')}
                                        <Form.Item
                                            noStyle
                                            shouldUpdate={(prevValues, currentValues) => prevValues.schedule !== currentValues.schedule}
                                        >
                                            {({ getFieldValue }) => (
                                                <DatePicker
                                                    showTime
                                                    format="YYYY-MM-DD HH:mm"
                                                    style={{ marginLeft: 10 }}
                                                    disabled={getFieldValue('schedule') !== 'later'}
                                                />
                                            )}
                                        </Form.Item>
                                    </Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    </Form.Item>
                    <Card size="small">
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Text strong>{t('preview')}</Text>
                            <Row gutter={16}>
                                <Col span={12}><Statistic title={t('estimatedRecipients')} value={selectedContacts.length} /></Col>
                                <Col span={12}><Statistic title={t('estimatedCost')} value={`$${(selectedContacts.length * 0.01).toFixed(2)}`} /></Col>
                            </Row>
                        </Space>
                    </Card>
                </Form>
            </Modal>

            {/* Upload Contacts Modal */}
            <Modal
                title={t('uploadContacts')}
                open={uploadModalVisible}
                onCancel={() => setUploadModalVisible(false)}
                footer={[
                    <Button key="back" onClick={() => setUploadModalVisible(false)}>{t('cancel')}</Button>,
                    <Button key="submit" type="primary" onClick={() => uploadForm.submit()}>{t('upload')}</Button>,
                ]}
            >
                <Form form={uploadForm} layout="vertical" onFinish={handleUploadContacts}>
                    <Form.Item name="file" rules={[{ required: true, message: t('fileRequired') }]}>
                        <Dragger>
                            <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                            <p className="ant-upload-text">{t('clickOrDragFile')}</p>
                            <p className="ant-upload-hint">{t('supportedFormats')}</p>
                        </Dragger>
                    </Form.Item>
                    <Divider />
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="nameColumn" label={t('nameColumn')} initialValue="A">
                                <Select>
                                    <Option value="A">Column A</Option>
                                    <Option value="B">Column B</Option>
                                    <Option value="C">Column C</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="emailColumn" label={t('emailColumn')} initialValue="B">
                                <Select>
                                    <Option value="A">Column A</Option>
                                    <Option value="B">Column B</Option>
                                    <Option value="C">Column C</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="phoneColumn" label={t('phoneColumn')} initialValue="C">
                                <Select>
                                    <Option value="A">Column A</Option>
                                    <Option value="B">Column B</Option>
                                    <Option value="C">Column C</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="tagsColumn" label={t('tagsColumn')} initialValue="D">
                                <Select>
                                    <Option value="A">Column A</Option>
                                    <Option value="B">Column B</Option>
                                    <Option value="C">Column C</Option>
                                    <Option value="D">Column D</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>

            {/* Edit Contact Modal */}
            <Modal
                title={t('editContact')}
                open={editModalVisible}
                onCancel={() => {
                    setEditModalVisible(false);
                    setEditingContact(null);
                    editForm.resetFields();
                }}
                footer={[
                    <Button 
                        key="back" 
                        onClick={() => {
                            setEditModalVisible(false);
                            setEditingContact(null);
                            editForm.resetFields();
                        }}
                    >
                        {t('cancel')}
                    </Button>,
                    <Button 
                        key="submit" 
                        type="primary" 
                        onClick={() => editForm.submit()}
                    >
                        {t('save')}
                    </Button>,
                ]}
                width={600}
            >
                <Form 
                    form={editForm} 
                    layout="vertical" 
                    onFinish={handleEditContact}
                >
                    <Form.Item 
                        name="name" 
                        label={t('name')} 
                        rules={[{ required: true, message: t('nameRequired') }]}
                    >
                        <Input prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item 
                        name="email" 
                        label={t('email')} 
                        rules={[{ type: 'email', message: t('invalidEmail') }]}
                    >
                        <Input prefix={<MailOutlined />} />
                    </Form.Item>
                    <Form.Item 
                        name="phone" 
                        label={t('phone')} 
                        rules={[{ required: true, message: t('phoneRequired') }]}
                    >
                        <Input prefix={<PhoneOutlined />} />
                    </Form.Item>
                    <Form.Item 
                        name="channel" 
                        label={t('channel')} 
                        rules={[{ required: true, message: t('channelRequired') }]}
                    >
                        <Select>
                            <Option value="Facebook">Facebook</Option>
                            <Option value="Instagram">Instagram</Option>
                            <Option value="WhatsApp">WhatsApp</Option>
                            <Option value="Email">Email</Option>
                            <Option value="SMS">SMS</Option>
                            <Option value="TikTok">TikTok</Option>
                            <Option value="X">X</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="tags" label={t('tags')}>
                        <Select mode="multiple" allowClear>
                            <Option value="Lead">{t('lead')}</Option>
                            <Option value="Customer">{t('customer')}</Option>
                            <Option value="VIP">{t('vip')}</Option>
                            <Option value="Interested">{t('interested')}</Option>
                            <Option value="Cold">{t('cold')}</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item 
                        name="status" 
                        label={t('status')} 
                        rules={[{ required: true, message: t('statusRequired') }]}
                    >
                        <Select>
                            <Option value="New">{t('new')}</Option>
                            <Option value="Active">{t('active')}</Option>
                            <Option value="Unsubscribed">{t('unsubscribed')}</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Export Contacts Modal */}
            <Modal
                title={t('exportContacts')}
                open={exportModalVisible}
                onCancel={() => setExportModalVisible(false)}
                footer={[
                    <Button key="back" onClick={() => setExportModalVisible(false)}>{t('cancel')}</Button>,
                    <Button key="submit" type="primary" onClick={handleExportContacts}>{t('export')}</Button>,
                ]}
            >
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Text>{t('exportDescription')}</Text>
                    <Select defaultValue="csv" style={{ width: '100%' }} onChange={(value) => console.log('Export format:', value)}>
                        <Option value="csv">CSV</Option>
                        <Option value="excel">Excel</Option>
                        <Option value="json">JSON</Option>
                    </Select>
                    <Checkbox>{t('includeAllFields')}</Checkbox>
                </Space>
            </Modal>
        </>
    );
}

export default CampaignsDashboard;