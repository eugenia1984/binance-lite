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
import { Box, Button } from '@mui/material'
import { labels, labelsB } from '../../../utils/constants'
import { GRAFICO_AREA_STYLES } from './GraficoAreaStyles'

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

const options = {
    responsive: true,
    scales: { y: { min: 0 } },
    plugins: {
        legend: { display: false, },
        title: {},
    },
}

const optionsB = {
    responsive: true,
    scales: { y: { min: 0 } },
    plugins: {
        legend: { display: false },
        title: {},
    },
}

const data = {
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


const datab = {
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
    const [showArea, setShowArea] = useState(true)

    return (
        <>
            <Box sx={ { height: { xs: '220px', sm: '340px' } } }>
                { showArea && <Line options={ options } data={ data } /> }
                { !showArea && <Line options={ optionsB } data={ datab } /> }
            </Box>
            <Box sx={ GRAFICO_AREA_STYLES.boxBtn } >
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