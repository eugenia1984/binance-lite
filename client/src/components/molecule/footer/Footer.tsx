import React from 'react'
import { Grid, Typography } from '@mui/material'
import { FOOTER_STYLES } from './FooterStyles'
import NavBar from '../navbar/NavBar'

const Footer: React.FC = () => {
  const token = localStorage.getItem('token')

  return (
    <footer>
      <Grid container maxWidth="lg" sx={ FOOTER_STYLES.container } >
        <Grid item xs={ 12 } sx={ FOOTER_STYLES.gridYear } >
          <Typography>
            Binance &copy; { new Date().getFullYear() }
          </Typography>
        </Grid>
        { token &&
          <Grid item xs={ 12 } sx={ FOOTER_STYLES.gridNavBar } >
            <NavBar />
          </Grid>
        }
      </Grid>
    </footer>
  )
}

export default Footer