import { Button, Card, Col, Form, Row, Select } from 'antd';
import { useAppDispatch } from '../hooks';
import { connectDevices } from '../features/messages/messagesSlice';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = () => {
        const values = form.getFieldsValue();
        dispatch(connectDevices(values));
        navigate('/app');
    };

    const ConfigureServerForm = (
        <Form layout='vertical' name='basic' form={form} style={{ width: '700px' }}>
            <Row gutter={32}>
                <Col span={12}>
                    <Form.Item label='Choose Machine' name='machine_id'>
                        <Select>
                            <Select.Option value='M12345'>M12345</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label='Choose Device' name='device_id'>
                        <Select>
                            <Select.Option value='D12345'>D12345</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );

    return (
        <main className='home'>
            <Card
                title='Connect devices'
                actions={[
                    <Button type='primary' onClick={handleSubmit}>
                        Connect
                    </Button>,
                ]}
            >
                {ConfigureServerForm}
            </Card>
        </main>
    );
}
