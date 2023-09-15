import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { Typography } from '@mui/material'

ChartJS.register(ArcElement, Tooltip, Legend)

export const data = {
    labels: ['Etherium', 'Bitcoin', 'Tether', 'Cardano', 'Dogecoin'],
    datasets: [
        {
            label: '%',
            data: [65, 10, 9, 6, 10],
            backgroundColor: [
                'rgba(54, 162, 235, 0.9)',
                'rgba(255, 206, 86, 0.9)',
                'rgba(75, 192, 192, 0.9)',
                'rgba(153, 102, 255, 0.9)',
                'rgba(255, 159, 64, 0.9)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86,1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const GraficoDona: React.FC = () => {
    return (
        <>
            <Doughnut data={ data } />
        </>

    )
}
export default GraficoDona