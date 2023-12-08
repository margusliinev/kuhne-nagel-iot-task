export const topicOptions = [
    {
        label: 'Temperature',
        value: 'Machine Temperature',
    },
    {
        label: 'Vibrations',
        value: 'Machine Vibrations',
    },
    {
        label: 'Pressure',
        value: 'Machine Pressure',
    },
    {
        label: 'Humidity',
        value: 'Machine Humidity',
    },
];

export const qosOptions = [
    {
        label: '0',
        value: 0,
    },
    {
        label: '1',
        value: 1,
    },
    {
        label: '2',
        value: 2,
    },
];

export const record = {
    topic: 'Machine Temperature',
    qos: 0,
};

export const getTimestamps = (messages) => {
    const timestamps = messages.map((entry) => {
        const date = new Date(entry.message.timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    });

    return timestamps;
};

export const generatePayload = (topic, machine_id, device_id, average, variation) => {
    const timestamp = new Date(Date.now());
    const deviation = (average * variation) / 100;
    const value = average + (Math.random() * 2 - 1) * deviation;
    const getRandomAxisValue = () => average + (Math.random() * 2 - 1) * deviation;

    switch (topic) {
        case 'Machine Temperature':
            return {
                timestamp: timestamp,
                machine_id: machine_id,
                device_id: device_id,
                status: 'normal',
                temperature: {
                    value: value,
                    unit: 'Celsius',
                },
            };
        case 'Machine Vibrations':
            return {
                timestamp: timestamp,
                machine_id: machine_id,
                device_id: device_id,
                status: 'normal',
                vibration: {
                    x_axis: getRandomAxisValue(),
                    y_axis: getRandomAxisValue(),
                    z_axis: getRandomAxisValue(),
                    unit: 'g',
                },
            };
        case 'Machine Pressure':
            return {
                timestamp: timestamp,
                machine_id: machine_id,
                device_id: device_id,
                status: 'normal',
                pressure: {
                    value: value,
                    unit: 'kPa',
                },
            };
        case 'Machine Humidity':
            return {
                timestamp: timestamp,
                machine_id: machine_id,
                device_id: device_id,
                status: 'normal',
                humidity: {
                    value: value,
                    unit: 'percent',
                },
            };
    }
};
