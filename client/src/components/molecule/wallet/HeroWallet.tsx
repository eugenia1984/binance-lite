import React, { useContext, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { HERO_MARKET_STYLES } from '../../template/hero-market/HeroMarketStyles'
import AuthContext from '../../../context/AuthContext'
const HeroWallet = () => {
    const [isAmountVisible, setIsAmountVisible] = useState(true)
    const { loginAuth } = useContext(AuthContext);
    console.log(loginAuth);

    const handleVisibilityToggle = () => {
        setIsAmountVisible((prevIsAmountVisible) => !prevIsAmountVisible)
    }

    return (
        <>
            <Grid
                item
                xs={12}
                sm={4}
                md={3}
                sx={HERO_MARKET_STYLES.container}
            >
                <Grid
                    container
                    sx={HERO_MARKET_STYLES.containerSaldo}
                >
                    <Grid
                        item
                        xs={12}
                        sx={HERO_MARKET_STYLES.saldoText}
                    >
                        <Typography
                            component="h2"
                            sx={{ fontSize: '24px', fontWeight: '700' }}
                        >
                            Saldo total
                        </Typography>
                        <Box
                            component="span"
                            onClick={handleVisibilityToggle}
                        >
                            {isAmountVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            component="h2"
                            sx={HERO_MARKET_STYLES.saldoAmount}
                        >
                            {isAmountVisible ? `${loginAuth.balance}` : '******'}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
export default HeroWallet