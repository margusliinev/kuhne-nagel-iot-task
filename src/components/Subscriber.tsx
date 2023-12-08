import { Card, Form, Row, Col, Button, Select, Input } from 'antd';
import { qosOptions, record, topicOptions } from '../utils';
import { setParameters } from '../features/messages/messagesSlice';
import { useAppDispatch } from '../hooks';
import { useNavigate } from 'react-router-dom';

const Subscriber = ({ sub, unSub, showUnsub }) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onFinish = (values) => {
        const { topic, qos, average, standardVariation, frequency } = values;
        dispatch(setParameters({ average, standardVariation, frequency }));
        sub({ topic, qos });
        navigate('/app');
    };

    const handleUnsub = () => {
        const values = form.getFieldsValue();
        unSub(values);
    };

    const SubForm = (
        <Form layout='vertical' name='basic' form={form} initialValues={record} onFinish={onFinish}>
            <Row gutter={20}>
                <Col span={12}>
                    <Form.Item label='Topic' name='topic'>
                        <Select options={topicOptions} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label='QoS' name='qos'>
                        <Select options={qosOptions} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label='Average Value' name='average'>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
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
                <Col span={12}>
                    <Form.Item label='Frequency (in seconds)' name='frequency'>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={20} offset={0} style={{ textAlign: 'left' }}>
                    <Form.Item style={{ display: 'flex' }}>
                        <Button type='primary' htmlType='submit'>
                            Subscribe
                        </Button>
                        {showUnsub ? (
                            <Button type='text' style={{ marginLeft: '10px' }} onClick={handleUnsub}>
                                Unsubscribe
                            </Button>
                        ) : null}
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );

    return <Card title='Subscriber'>{SubForm}</Card>;
};

export default Subscriber;
