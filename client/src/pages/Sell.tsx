import React, { useState} from 'react'
import { Container, Typography } from '@mui/material'
import SearchBar from '../components/molecule/searchBar'
import CoinsSellBuyTable from '../components/molecule/coins-table/CoinsSellBuyTable'
import { useLocation } from 'react-router-dom'
import { useApiContext } from '../context/FetchContext'

const Sell = () => {
  const [search, setSearch] = useState([])
  const { coinsData } = useApiContext()

  const location = useLocation()
  const urlPathName = location.pathname

  const handleSearch = (results) => setSearch(results)

  return (
    <Container maxWidth="sm" sx={ { minHeight: '82vh' } }>
      <Typography
        variant="h2"
        align="center"
        sx={ { marginTop: '55px', marginBottom: '20px' } }
      >
        Elegir moneda a vender
      </Typography>
      <SearchBar onSearch={ handleSearch } />
      <Typography
        variant="h3"
        align="left"
        sx={ { color: 'red', marginBottom: '50px', fontWeight: '700' } }
      >
        Tenencias en cartera
      </Typography>
      <CoinsSellBuyTable
        urlPathName={ urlPathName }
        btnText="Vender"
        coinsData={ search.length > 0 ? search : coinsData  }
      />
    </Container>
  )
}

export default Sell
