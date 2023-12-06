import { CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Chart as ChartJS } from 'chart.js';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const HumidityGraph = ({ messages }) => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
    const [data, setData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const timestamps = messages.map((entry) => {
            const date = new Date(entry.message.timestamp);
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            return `${hours}:${minutes}:${seconds}`;
        });
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
            <h5 className='graph-title'>Humidity Over Time</h5>
            <Line data={data} />
        </div>
    );
};

export default HumidityGraph;
