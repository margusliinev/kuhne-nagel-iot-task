import { Card, Form, Input, Row, Col, Button, Select } from 'antd';
import { qosOptions, record, topicOptions } from '../utils';

const Publisher = ({ publish }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        publish(values);
    };

    const PublishForm = (
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
                <Col span={24}>
                    <Form.Item label='Payload' name='payload'>
                        <Input.TextArea style={{ minHeight: '100px' }} />
                    </Form.Item>
                </Col>
                <Col span={8} offset={0} style={{ textAlign: 'left' }}>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            Publish
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );

    return <Card title='Publisher'>{PublishForm}</Card>;
};

export default Publisher;
