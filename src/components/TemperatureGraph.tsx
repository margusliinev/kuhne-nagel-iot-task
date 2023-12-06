import { CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Chart as ChartJS } from 'chart.js';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const TemperatureGraph = ({ messages }) => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Temperature (Celsius)',
                data: 0,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    });

    useEffect(() => {
        const timestamps = messages.map((message) => {
            const date = new Date(message.message.timestamp);
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            return `${hours}:${minutes}:${seconds}`;
        });
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
            <h5 className='graph-title'>Temperature Over Time</h5>
            <Line data={data} />
        </div>
    );
};

export default TemperatureGraph;
