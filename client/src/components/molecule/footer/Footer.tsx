import React from 'react'
import { Grid, Typography } from '@mui/material'
import { FOOTER_STYLES } from './FooterStyles'
import NavBar from '../navbar/NavBar'

const Footer: React.FC = () => {
  const token = localStorage.getItem('token')

  return (
    <footer
      style={ {
        height: '250px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'center'
      } }
    >
      <Grid container maxWidth="lg" sx={ FOOTER_STYLES.container } >
        { token &&
          <Grid item xs={ 12 } sx={ FOOTER_STYLES.gridNavBar } >
            <NavBar />
          </Grid>
        }
        <Grid item xs={ 12 } sx={ FOOTER_STYLES.gridYear } >
          <Typography>
            Binance-L &copy; { new Date().getFullYear() }
          </Typography>
        </Grid>
      </Grid>
    </footer>
  )
}

export default Footer