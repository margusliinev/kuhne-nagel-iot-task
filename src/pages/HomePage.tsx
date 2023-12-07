import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import { useAppDispatch } from '../hooks';
import { setParameters } from '../features/messages/messagesSlice';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log(values);
    };

    const handleSubmit = () => {
        const values = form.getFieldsValue();
        dispatch(setParameters(values));
        navigate('/app');
    };

    const ConfigureServerForm = (
        <Form layout='vertical' name='basic' form={form} onFinish={onFinish}>
            <Row gutter={20}>
                <Col span={8}>
                    <Form.Item label='Choose Machine' name='machine_id'>
                        <Select>
                            <Select.Option value='M12345'>M12345</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label='Choose Device' name='device_id'>
                        <Select>
                            <Select.Option value='D12345'>D12345</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label='Frequency' name='frequency'>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label='Average' name='average'>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label='Standard Variation' name='standardVariation'>
                        <Select>
                            <Select.Option value='10'>10%</Select.Option>
                            <Select.Option value='20'>20%</Select.Option>
                            <Select.Option value='30'>30%</Select.Option>
                            <Select.Option value='40'>40%</Select.Option>
                            <Select.Option value='50'>50%</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );

    return (
        <main className='home'>
            <Card
                title='Configure Server'
                actions={[
                    <Button type='primary' onClick={handleSubmit}>
                        Submit
                    </Button>,
                ]}
            >
                {ConfigureServerForm}
            </Card>
        </main>
    );
}
