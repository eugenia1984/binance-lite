import React, { useContext, useState } from 'react'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import GraficoArea from '../components/molecule/wallet/GraficoArea'
import GraficoDona from '../components/molecule/wallet/GraficoDona'
import HeroWallet from '../components/molecule/wallet/HeroWallet'
import DataUsageIcon from '@mui/icons-material/DataUsage'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import CoinsSellBuyTable from '../components/molecule/coins-table/CoinsSellBuyTable'
import { useApiContext } from '../context/FetchContext'
import AuthContext from '../context/AuthContext'

interface WalletsProps { }

const Wallets: React.FC<WalletsProps> = () => {
  const [showArea, setShowArea] = useState(true)
  const { loginAuth } = useContext(AuthContext);
  console.log(loginAuth);

  const { coinsData } = useApiContext()


  return (
    <Container maxWidth="sm" sx={{ minHeight: '82vh', marginTop: '1.75rem' }}>
      <Typography variant="h2" sx={{ marginBottom: '24px' }}>Bienvenido {loginAuth?.email}</Typography>
      <HeroWallet />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          my: '2rem',
          gap: '12px'
        }}
      >
      </Box>
      <Grid container>
        <Grid item xs={6} sm={8} sx={{ alignItems: 'center' }}>
          <Typography variant="h2">
            {showArea ? 'Tendencia' : 'Distibucion de activos'}
          </Typography>
        </Grid>
        <Grid item xs={3} sm={2}>
          <Button
            onClick={() => setShowArea(true)}
            disabled={showArea}
            aria-label="Mostrar grafico de area"
            sx={{
              background: '#fff',
              border: '1px solid gray',
              borderRadius: '14px 0px 0px 14px'
            }}
          >
            <ShowChartIcon />
          </Button>
        </Grid>
        <Grid item xs={3} sm={2}>
          <Button
            onClick={() => setShowArea(false)}
            disabled={!showArea}
            aria-label="Mostrar grafico de torta"
            sx={{
              background: '#fff',
              border: '1px solid gray',
              borderRadius: '0px 14px 14px 0px'
            }}
          >
            <DataUsageIcon />
          </Button>
        </Grid>
      </Grid>
      {showArea && <GraficoArea />}
      {!showArea && <GraficoDona />}
      <CoinsSellBuyTable
        urlPathName="/sell"
        btnText="vender"
        coinsData={coinsData}
      />
    </Container>
  )
}

export default Wallets
