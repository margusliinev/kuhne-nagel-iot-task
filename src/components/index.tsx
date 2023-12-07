import { useEffect, useState } from 'react';
import TemperatureGraph from './TemperatureGraph';
import VibrationsGraph from './VibrationsGraph';
import PressureGraph from './PressureGraph';
import HumidityGraph from './HumidityGraph';
import Connection from './Connection';
import Publisher from './Publisher';
import Receiver from './Receiver';
import Subscriber from './Subscriber';
import mqtt from 'mqtt';

export default function Layout() {
    const [client, setClient] = useState(null);
    const [isSubed, setIsSub] = useState(false);
    const [payload, setPayload] = useState({});
    const [connectStatus, setConnectStatus] = useState('Connect');

    const mqttConnect = (host, mqttOption) => {
        setConnectStatus('Connecting');
        setClient(mqtt.connect(host, mqttOption));
    };

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
        <main className='main'>
            <Connection connect={mqttConnect} disconnect={mqttDisconnect} connectBtn={connectStatus} />
            <QosOption.Provider value={qosOption}>
                <Subscriber sub={mqttSub} unSub={mqttUnSub} showUnsub={isSubed} />
                <Publisher publish={mqttPublish} />
            </QosOption.Provider>
            <Receiver payload={payload} />
            <TemperatureGraph messages={temperatureMessages} />
            <VibrationsGraph messages={vibrationsMessages} />
            <PressureGraph messages={pressureMessages} />
            <HumidityGraph messages={humidityMessages} />
        </main>
    );
}
