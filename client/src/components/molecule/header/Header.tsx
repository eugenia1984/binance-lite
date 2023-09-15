import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Grid } from '@mui/material'
import { HEADER_STYLES } from './HeaderStyles'
import NavBar from '../navbar/NavBar'
import useAuth from './../../../hooks/useAuth'

const Header: React.FC = () => {
  const token = localStorage.getItem('token')
  const { isLogueado, setIsLogueado } = useAuth()
  const navigate = useNavigate()

  const handleLogOut = () => {
    setIsLogueado(false)
    if (token) localStorage.removeItem('token')
    navigate("/")
  }

  return (
    <header>
      <Grid container maxWidth="lg" sx={ HEADER_STYLES.container } >
        {
          !token ?
            <>
              <Grid item xs={ 6 } sm={ 3 } sx={ HEADER_STYLES.containerLogo } >
                <Link to="/" aria-label="ir a login o registrarse" style={ HEADER_STYLES.linkLogo } >
                  <img width="40" height="40" src="/binance-64.png" alt="Binance cryptocurrency logo" />
                  <Box component="span" sx={ HEADER_STYLES.logo }> Binance</Box>
                </Link>
              </Grid>
              <Grid item xs={ 6 } sm={ 9 }></Grid>
            </>
            :
            <>
              <Grid item xs={ 5 } sm={ 3 } sx={ HEADER_STYLES.containerLogo } >
                <Link to="/market" aria-label="ir a mercados" style={ HEADER_STYLES.linkLogo } >
                  <img width="40" height="40" src="/binance-64.png" alt="Binance cryptocurrency logo" />
                  <Box component="span" sx={ HEADER_STYLES.logo }> Binance</Box>
                </Link>
              </Grid>
              <Grid item xs={ 4.5 } sm={ 7 } sx={ HEADER_STYLES.containerNavBar } >
                <Box sx={ HEADER_STYLES.navBar }>
                  { isLogueado && <NavBar /> }
                </Box>
              </Grid>
              <Grid item xs={ 2.5 } sm={ 2 } sx={ HEADER_STYLES.containerAvatar } >
                { isLogueado &&
                  <>
                    <Button
                      onClick={ handleLogOut }
                      aria-label="salir"
                    >
                      Salir
                    </Button>
                  </>
                }
              </Grid>
            </>
        }
      </Grid>
    </header>
  )
}

export default Header