import { CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Chart as ChartJS } from 'chart.js';
import { useState, useEffect } from 'react';
import { getTimestamps } from '../utils';
import { Line } from 'react-chartjs-2';

const HumidityGraph = ({ messages }) => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
    const [data, setData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const timestamps = getTimestamps(messages);
        const humidity = messages.map((entry) => entry.message.humidity.value);

        setData({
            labels: timestamps,
            datasets: [
                {
                    label: 'Humidity (%)',
                    data: humidity,
                    fill: false,
                    borderColor: 'rgb(160, 20, 100)',
                    tension: 0.1,
                },
            ],
        });
    }, [messages]);

    return (
        <div className='graph-card'>
            <h2 className='graph-title'>Humidity</h2>
            <Line data={data} />
        </div>
    );
};

export default HumidityGraph;
