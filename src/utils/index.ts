export const topicOptions = [
    {
        label: 'Temperature',
        value: 'Temperature',
    },
    {
        label: 'Vibrations',
        value: 'Vibrations',
    },
    {
        label: 'Pressure',
        value: 'Pressure',
    },
    {
        label: 'Humidity',
        value: 'Humidity',
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
