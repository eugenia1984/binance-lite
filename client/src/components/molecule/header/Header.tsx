import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Grid } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { HEADER_STYLES } from './HeaderStyles'
import NavBar from '../navbar/NavBar'
import useAuth from './../../../hooks/useAuth'
import PrimaryButton from '../../atom/buttons/PrimaryButton'

const Header: React.FC = () => {
  const token = localStorage.getItem('token')
  const { isLogueado, setIsLogueado } = useAuth()
  const navigate = useNavigate()

  const handleLogOut = () => {
    setIsLogueado(false)
    // If there is a token at localStorage delete all localStorage
    if (token) localStorage.clear()
    navigate("/")
  }

  return (
    <header>
      <Grid container maxWidth="lg" sx={ HEADER_STYLES.container } >
        { !token &&
          <>
            <Grid item xs={ 7 } sm={ 3 } sx={ HEADER_STYLES.containerLogo } >
              <Link
                to="/"
                aria-label="ir a login o registrarse"
                style={ {
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center'
                } }
              >
                <img width="30" height="30" src="/binance-64.png" alt="Binance cryptocurrency logo" />
                <Box component="span" sx={ HEADER_STYLES.logo }> Binance-L</Box>
              </Link>
            </Grid>
            <Grid item xs={ 5 } sm={ 9 }></Grid>
          </>
        }
        {
          token &&
          <>
            <Grid item xs={ 5.5 } sm={ 3 } md={ 3 } sx={ HEADER_STYLES.containerLogo } >
              <Link
                to="/market"
                aria-label="ir a mercados"
                style={ {
                  textDecoration: 'none',
                  display: 'flex',
                  alignContent: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row'
                } }
              >
                <img width="40" height="40" src="/binance-64.png" alt="Binance cryptocurrency logo" />
                <Box component="span" sx={ HEADER_STYLES.logo }> Binance-L</Box>
              </Link>
            </Grid>
            <Grid item xs={ 1.5 } sm={ 6 } md={ 6 } sx={ HEADER_STYLES.containerNavBar } >
              <Box sx={ HEADER_STYLES.navBar }>
                { isLogueado && <NavBar /> }
              </Box>
            </Grid>
            <Grid item xs={ 5 } sm={ 3 } md={ 3 } sx={ HEADER_STYLES.containerLogout } >
              { isLogueado &&
                <PrimaryButton
                  text='Salir'
                  onClick={ handleLogOut }
                  ariaLabelText="Salir"
                  icon={ <LogoutIcon /> }
                  sx={ { maxWidth: '140px' } }
                />
              }
            </Grid>
          </>
        }
      </Grid>
    </header>
  )
}

export default Header