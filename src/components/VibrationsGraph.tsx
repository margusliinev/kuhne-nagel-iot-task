import { CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Chart as ChartJS } from 'chart.js';
import { useState, useEffect } from 'react';
import { getTimestamps } from '../utils';
import { Line } from 'react-chartjs-2';

const VibrationsGraph = ({ messages }) => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
    const [data, setData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const timestamps = getTimestamps(messages);
        const xValues = messages.map((entry) => entry.message.vibration.x_axis);
        const yValues = messages.map((entry) => entry.message.vibration.y_axis);
        const zValues = messages.map((entry) => entry.message.vibration.z_axis);

        setData({
            labels: timestamps,
            datasets: [
                {
                    label: 'X-axis',
                    data: xValues,
                    borderColor: 'red',
                    fill: false,
                    tension: 0.1,
                },
                {
                    label: 'Y-axis',
                    data: yValues,
                    borderColor: 'green',
                    fill: false,
                    tension: 0.1,
                },
                {
                    label: 'Z-axis',
                    data: zValues,
                    borderColor: 'blue',
                    fill: false,
                    tension: 0.1,
                },
            ],
        });
    }, [messages]);

    return (
        <div className='graph-card'>
            <h2 className='graph-title'>Vibrations</h2>
            <Line data={data} />
        </div>
    );
};

export default VibrationsGraph;
