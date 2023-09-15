import React from 'react'
import { Container, Typography } from '@mui/material'
import SearchBar from '../components/molecule/searchBar'
import CoinsSellBuyTable from '../components/molecule/coins-table/CoinsSellBuyTable'
import { useLocation } from 'react-router-dom'
import { useApiContext } from '../context/FetchContext'
import BuyCoin from '../components/template/buy-coin/BuyCoin'


const Sell = () => {
  const {coinsData } = useApiContext()
  const location = useLocation()


  // const coins = coinsData.filter(coin => coin.uuid === idCoin)
  const urlPathName = location.search
  console.log(urlPathName)


  return (
    <Container maxWidth="sm" sx={{ minHeight: '82vh'}}>
      <Typography
        variant="h2"
        align="center"
        sx={ { marginTop: '55px', marginBottom: '20px' } }
      >
        Elegir activo a vender
      </Typography>
      <SearchBar />
      <Typography
        variant="h2"
        align="left"
        sx={ {
          color: 'red', marginBottom: '50px'
        } }
      >
        Tenencias en cartera
      </Typography>
      <CoinsSellBuyTable
        urlPathName={ urlPathName }
        btnText="Vender"
        coinsData={coinsData}
      />
    </Container>
  )
}

export default Sell
