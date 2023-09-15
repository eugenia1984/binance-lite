import React from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import MarketComponent from '../coins-table/CoinsTable'

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props
    return (
        <div
            role="tabpanel"
            hidden={ value !== index }
            id={ `simple-tabpanel-${ index }` }
            aria-labelledby={ `simple-tab-${ index }` }
            { ...other }
        >
            { value === index && (
                <Box sx={ { p: 3 } }>
                    <Box>{ children }</Box>
                </Box>
            ) }
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${ index }`,
        'aria-controls': `simple-tabpanel-${ index }`,
    }
}

export default function TabsSales() {
    const [value, setValue] = React.useState(1)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <Box sx={ { width: '100%' } }>
            <Box sx={ { borderBottom: 1, borderColor: 'divider' } }>
                <Tabs value={ value } onChange={ handleChange } aria-label="basic tabs example">
                    <Tab label="Moneda" { ...a11yProps(0) } />
                    <Tab label="Acciones" { ...a11yProps(1) } />
                </Tabs>
            </Box>
            <CustomTabPanel value={ value } index={ 0 }>
                <MarketComponent />
            </CustomTabPanel>
            <CustomTabPanel value={ value } index={ 1 }>
                <MarketComponent />
            </CustomTabPanel>
        </Box>
    )
}