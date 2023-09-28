import React, { useState } from 'react'
import { Button, Container, Grid, Typography } from '@mui/material'
import GraficoArea from '../components/molecule/wallet/GraficoArea'
import GraficoDona from '../components/molecule/wallet/GraficoDona'
import HeroWallet from '../components/molecule/wallet/HeroWallet'
import DataUsageIcon from '@mui/icons-material/DataUsage'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import CoinsSellBuyTable from '../components/molecule/coins-table/CoinsSellBuyTable'
import { useApiContext } from '../context/FetchContext'

const Wallets: React.FC = () => {
  const [showArea, setShowArea] = useState(true)
  const userOrEmail = localStorage.getItem('userOrEmail')
  const { coinsData } = useApiContext()

  const itemGraficoDona = {
    height: { xs: '300px', sm: '400px' },
    width: { xs: '300px', sm: '400px' },
    display: 'flex',
    justifyContent: 'center',
    margin: '2rem 0 3rem'
  }

  const itemGraficoArea = {
    height: { xs: '350px', sm: '480px' },
    margin: '2rem auto'
  }

  return (
    <Container maxWidth="sm" sx={ { margin: '1rem auto 150px', minHeight: '82vh' } }>
      { userOrEmail &&
        <Typography variant="h2" sx={ { marginBottom: '24px', fontSize: '18px' } } >
          Bienvenido/a { userOrEmail }
        </Typography>
      }
      <HeroWallet />
      <Grid container sx={ { marginTop: '5rem', alignItems: 'center' } }>
        <Grid item xs={ 6 } sm={ 8 } sx={ { alignItems: 'center' } }>
          <Typography variant="h2">
            { showArea ? 'Tendencia' : 'Distibucion de activos' }
          </Typography>
        </Grid>
        <Grid item xs={ 3 } sm={ 2 }>
          <Button
            onClick={ () => setShowArea(true) }
            disabled={ showArea }
            aria-label="Mostrar grafico de area"
            sx={ {
              background: '#fff',
              border: '1px solid gray',
              borderRadius: '14px 0px 0px 14px'
            } }
          >
            <ShowChartIcon />
          </Button>
        </Grid>
        <Grid item xs={ 3 } sm={ 2 }>
          <Button
            onClick={ () => setShowArea(false) }
            disabled={ !showArea }
            aria-label="Mostrar grafico de torta"
            sx={ {
              background: '#fff',
              border: '1px solid gray',
              borderRadius: '0px 14px 14px 0px'
            } }
          >
            <DataUsageIcon />
          </Button>
        </Grid>
        { showArea &&
          <Grid item xs={ 12 } sx={ itemGraficoArea } >
            <GraficoArea />
          </Grid>
        }
        { !showArea &&
          <Grid item xs={ 12 } sx={ itemGraficoDona }>
            <GraficoDona />
          </Grid>
        }
      </Grid>
      <CoinsSellBuyTable
        urlPathName="/sell"
        btnText="vender"
        coinsData={ coinsData }
      />
    </Container>
  )
}

export default Wallets
