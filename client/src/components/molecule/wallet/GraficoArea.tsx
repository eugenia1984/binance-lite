import React, { useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'
import { Box, Button, Typography } from '@mui/material'
import { labels, labelsB } from '../../../utils/constants'

interface ContextType {
    type: string
    p1DataIndex: number
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
)

export const options = {
    responsive: true,
    scales: {
        y: { min: 0 }
    },
    plugins: {
        legend: { display: false, },
        title: {},
    },
}

export const optionsB = {
    responsive: true,
    scales: {
        y: { min: 0 }
    },
    plugins: {
        legend: { display: false },
        title: {},
    },
}

export const data = {
    labels,
    datasets: [
        {
            fill: true,
            label: '',
            tension: 0.4,
            pointRadius: 6,
            pointBackgroundColor: 'rgb(75,199,19)',
            data: labels.map(() => faker.finance.amount({ min: 0, max: 1000 })),
            borderColor: 'rgb(75, 180, 11)',
            backgroundColor: 'rgb(75, 180, 11, 0.3)',
            segment: {
                borderColor: function (context: ContextType) {
                    if (context.type === 'segment') {
                        return context.p1DataIndex % 2 === 0 ? 'rgb(190, 10, 11)' : 'rgb(75, 180, 11)';
                    }
                },
                backgroundColor: function (context: ContextType) {
                    if (context.type === 'segment') {
                        return context.p1DataIndex % 2 === 0 ? 'rgb(190, 10, 11, 0.3)' : 'rgb(75, 180, 11, 0.3)';
                    }
                },
            },
        },
    ],
};


export const datab = {
    labels: labelsB,
    datasets: [
        {
            fill: true,
            label: '',
            tension: 0.4,
            pointRadius: 6,
            pointBackgroundColor: 'rgb(75,199,19)',
            data: labelsB.map(() => faker.finance.amount({ min: 0, max: 1000 })),
            borderColor: 'rgb(75, 180, 11)',
            backgroundColor: 'rgb(75, 180, 11, 0.3)',
            segment: {
                borderColor: function (context: ContextType) {
                    if (context.type === 'segment') {
                        return context.p1DataIndex % 2 === 0 ? 'rgb(190, 10, 11)' : 'rgb(75, 180, 11)';
                    }
                },
                backgroundColor: function (context: ContextType) {
                    if (context.type === 'segment') {
                        return context.p1DataIndex % 2 === 0 ? 'rgb(190, 10, 11, 0.3)' : 'rgb(75, 180, 11, 0.3)';
                    }
                },
            },
        },
    ],
};

const GraficoArea: React.FC = () => {
    const [showArea, setShowArea] = useState(true);

    return (
        <>
            { showArea && <Line options={ options } data={ data } /> }
            { !showArea && <Line options={ optionsB } data={ datab } /> }
            <Box
                sx={ {
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    my: '2rem',
                    gap: '24px'
                } }
            >
                <Button
                    onClick={ () => setShowArea(true) }
                    disabled={ showArea }
                    aria-label="dia uno"
                    variant="outlined"
                    sx={ { background: 'white' } }
                >
                    1 Dia
                </Button>
                <Button
                    variant="outlined"
                    onClick={ () => setShowArea(false) }
                    disabled={ !showArea }
                    aria-label="1 semana "
                    sx={ { background: 'white' } }
                >
                    1 Semana
                </Button>
            </Box>
        </>
    )



}


export default GraficoArea