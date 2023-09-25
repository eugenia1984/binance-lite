import React, { useState } from 'react'
import { Container, Typography } from '@mui/material'
import SearchBar from '../components/molecule/searchBar/SearchBar'
import CoinsSellBuyTable from '../components/molecule/coins-table/CoinsSellBuyTable'
import { useLocation } from 'react-router-dom'
import { useApiContext } from '../context/FetchContext'

const Buy = () => {
  const [search, setSearch] = useState([])
  const { coinsData } = useApiContext()

  const location = useLocation()
  const urlPathName = location.pathname

  const handleSearch = (results) => setSearch(results)

  return (
    <Container maxWidth="sm" sx={ { margin: '1rem auto 150px', minHeight: '82vh' } }>
      <Typography
        variant="h2"
        align="center"
        sx={ { marginTop: '55px', marginBottom: '20px' } }
      >
        Elegir moneda a comprar
      </Typography>
      <SearchBar onSearch={ handleSearch } />
      <CoinsSellBuyTable
        urlPathName={ urlPathName }
        btnText="Comprar"
        coinsData={ search.length > 0 ? search : coinsData }
      />
    </Container>
  )
}

export default Buy