import { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks';
import { generatePayload } from '../utils';
import TemperatureGraph from '../components/TemperatureGraph';
import VibrationsGraph from '../components/VibrationsGraph';
import PressureGraph from '../components/PressureGraph';
import HumidityGraph from '../components/HumidityGraph';
import Connection from '../components/Connection';
import Publisher from '../components/Publisher';
import Receiver from '../components/Receiver';
import Subscriber from '../components/Subscriber';
import mqtt from 'mqtt';

export default function AppPage() {
    const { messages, parameters } = useAppSelector((store) => store.messages);
    const [client, setClient] = useState(null);
    const [isSubed, setIsSub] = useState(false);
    const [payload, setPayload] = useState({});
    const [topic, setTopic] = useState('Machine Temperature');
    const [connectStatus, setConnectStatus] = useState('Connect');

    const temperatureMessages = messages.filter((message) => message.topic === 'Machine Temperature');
    const vibrationsMessages = messages.filter((message) => message.topic === 'Machine Vibrations');
    const pressureMessages = messages.filter((message) => message.topic === 'Machine Pressure');
    const humidityMessages = messages.filter((message) => message.topic === 'Machine Humidity');

    const mqttConnect = (host, mqttOption) => {
        setConnectStatus('Connecting');
        setClient(mqtt.connect(host, mqttOption));
    };

    useEffect(() => {
        if (isSubed) {
            const intervalId = setInterval(() => {
                const newPayload = generatePayload(
                    topic,
                    parameters.machine_id,
                    parameters.device_id,
                    parameters.average,
                    parameters.standardVariation
                );

                mqttPublish({ topic: topic, qos: 0, payload: JSON.stringify(newPayload) });
            }, parameters.frequency * 1000);

            return () => clearInterval(intervalId);
        }
    }, [isSubed]);

    useEffect(() => {
        if (client) {
            client.on('connect', () => {
                setConnectStatus('Connected');
                console.log('connection successful');
            });

            client.on('error', (err) => {
                console.error('Connection error: ', err);
                client.end();
            });

            client.on('reconnect', () => {
                setConnectStatus('Reconnecting');
            });

            client.on('message', (topic, message) => {
                const payload = { topic, message: message.toString() };
                setPayload(payload);
            });
        }
    }, [client]);

    const mqttDisconnect = () => {
        if (client) {
            try {
                client.end(false, () => {
                    setConnectStatus('Connect');
                    console.log('disconnected successfully');
                });
            } catch (error) {
                console.log('disconnect error:', error);
            }
        }
    };

    const mqttPublish = (context) => {
        if (client) {
            const { topic, qos, payload } = context;
            client.publish(topic, payload, { qos }, (error) => {
                if (error) {
                    console.log('Publish error: ', error);
                }
            });
        }
    };

    const mqttSub = (subscription) => {
        if (client) {
            const { topic, qos } = subscription;

            client.subscribe(topic, { qos }, (error) => {
                if (error) {
                    console.log('Subscribe to topics error', error);
                    return;
                }
                console.log(`Subscribe to topics: ${topic}`);
                setTopic(topic);
                setIsSub(true);
            });
        }
    };

    const mqttUnSub = (subscription) => {
        if (client) {
            const { topic, qos } = subscription;
            client.unsubscribe(topic, { qos }, (error) => {
                if (error) {
                    console.log('Unsubscribe error', error);
                    return;
                }
                console.log(`unsubscribed topic: ${topic}`);
                setIsSub(false);
            });
        }
    };

    return (
        <main className='app'>
            <Connection connect={mqttConnect} disconnect={mqttDisconnect} connectStatus={connectStatus} />
            <Subscriber sub={mqttSub} unSub={mqttUnSub} showUnsub={isSubed} />
            <Publisher publish={mqttPublish} />
            <Receiver payload={payload} />
            <TemperatureGraph messages={temperatureMessages} />
            <PressureGraph messages={pressureMessages} />
            <HumidityGraph messages={humidityMessages} />
            <VibrationsGraph messages={vibrationsMessages} />
        </main>
    );
}
