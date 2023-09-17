import React from 'react'
import { Grid } from '@mui/material'
import TabsMarket from '../components/molecule/tabs/TabsMarket'
import HeroMarket from '../components/template/hero-market/HeroMarket'

const Market: React.FC = () => {
  return (
    <main style={ { margin: '1rem auto 150px', minHeight: '82vh' } }>
      <Grid
        container
        maxWidth="lg"
        sx={ {
          margin: '0 auto',
          width: '100%',
          padding: '12px',
          flexDirection: {
            xs: 'column',
            sm: 'row'
          },
          alignItems: 'flex-start'
        } }
      >
        <HeroMarket />
      </Grid>
      <Grid container maxWidth="lg" sx={ { margin: '0 auto' } }>
        <TabsMarket />
      </Grid>
    </main>
  )
}

export default Market
