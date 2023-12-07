import { useAppSelector, useAppDispatch } from '../hooks';
import { setMessages } from '../features/messages/messagesSlice';
import { useEffect } from 'react';
import { Card, List } from 'antd';

const Receiver = ({ payload }) => {
    const { messages } = useAppSelector((store) => store.messages);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (payload?.topic) {
            dispatch(setMessages(payload));
        }
    }, [dispatch, payload]);

    const renderListItem = (item) => (
        <List.Item>
            <List.Item.Meta title={item.topic} description={JSON.stringify(item.message)} />
        </List.Item>
    );

    return (
        <Card title='Receiver'>
            <List size='small' bordered dataSource={messages} renderItem={renderListItem} className='receiver-list' />
        </Card>
    );
};

export default Receiver;
