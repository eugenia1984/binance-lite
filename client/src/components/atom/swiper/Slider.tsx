import React, { useContext } from 'react'
import SliderCupones from './SliderCupones'
import { Typography } from '@mui/material'
import AuthContext from '../../../context/AuthContext'

const Slider: React.FC = () => {

    const { loginAuth } = useContext(AuthContext)

    return (
        <div className='cupones'>
            <Typography
                component="h2"
                sx={ {
                    fontSize: '22px',
                    fontWeight: '600',
                    textAlign: 'center',
                    margin: '12px auto'
                } }
            >
            {loginAuth?.email}
            </Typography>
            <SliderCupones />
        </div>
    )
}

export default Slider
