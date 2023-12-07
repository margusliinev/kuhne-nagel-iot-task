import { CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Chart as ChartJS } from 'chart.js';
import { useState, useEffect } from 'react';
import { getTimestamps } from '../utils';
import { Line } from 'react-chartjs-2';

const PressureGraph = ({ messages }) => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
    const [data, setData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const timestamps = getTimestamps(messages);
        const pressure = messages.map((entry) => entry.message.pressure.value);

        setData({
            labels: timestamps,
            datasets: [
                {
                    label: 'Pressure (kPa)',
                    data: pressure,
                    fill: false,
                    borderColor: 'rgb(95, 162, 70)',
                    tension: 0.1,
                },
            ],
        });
    }, [messages]);

    return (
        <div className='graph-card'>
            <h2 className='graph-title'>Pressure</h2>
            <Line data={data} />
        </div>
    );
};

export default PressureGraph;
