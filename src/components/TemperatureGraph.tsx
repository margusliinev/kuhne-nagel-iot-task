import { CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Chart as ChartJS } from 'chart.js';
import { useState, useEffect } from 'react';
import { getTimestamps } from '../utils';
import { Line } from 'react-chartjs-2';

const TemperatureGraph = ({ messages }) => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
    const [data, setData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const timestamps = getTimestamps(messages);
        const temperatures = messages.map((entry) => entry.message.temperature.value);

        setData({
            labels: timestamps,
            datasets: [
                {
                    label: 'Temperature (Celsius)',
                    data: temperatures,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                },
            ],
        });
    }, [messages]);

    return (
        <div className='graph-card'>
            <h2 className='graph-title'>Temperature</h2>
            <Line data={data} />
        </div>
    );
};

export default TemperatureGraph;
