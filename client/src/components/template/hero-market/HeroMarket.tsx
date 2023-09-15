import React, { useContext, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Slider from '../../atom/swiper/Slider'
import { HERO_MARKET_STYLES } from './HeroMarketStyles'
import AuthContext from '../../../context/AuthContext'

const HeroMarket = () => {
  const [isAmountVisible, setIsAmountVisible] = useState(true)
  const { loginAuth } = useContext(AuthContext)

  const handleVisibilityToggle = () => {
    setIsAmountVisible((prevIsAmountVisible) => !prevIsAmountVisible)
  }

  const showAmount = () => {
    if (!isAmountVisible) return '**********'
    if (isAmountVisible)  return loginAuth?.balance === undefined ? '0.00' : loginAuth?.balance
  }

  return (
    <>
      <Grid item xs={ 12 }>
        <Typography sx={ HERO_MARKET_STYLES.saldoEmail }>
          { loginAuth?.email }
        </Typography>
      </Grid>
      <Grid item xs={ 12 } sm={ 4 } md={ 3 } sx={ HERO_MARKET_STYLES.container }>
        <Grid container sx={ HERO_MARKET_STYLES.containerSaldo }>
          <Grid item xs={ 12 } sx={ HERO_MARKET_STYLES.saldoText }>
            <Typography
              component="h2"
              sx={ { fontSize: '24px', fontWeight: '700' } }
            >
              Saldo total
            </Typography>
            <Box
              component="span"
              onClick={ handleVisibilityToggle }
            >
              { isAmountVisible ? <VisibilityIcon /> : <VisibilityOffIcon /> }
            </Box>
          </Grid>
          <Grid item xs={ 12 }>
            <Typography component="h2" sx={ HERO_MARKET_STYLES.saldoAmount }>
              { showAmount() }
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={ 12 } sm={ 8 } md={ 9 }>
        <Slider />
      </Grid>
    </>
  )
}
export default HeroMarket