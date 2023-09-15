import React, { useState } from 'react'
import { Container, Typography } from '@mui/material'
import SearchBar from '../components/molecule/searchBar'
import CoinsSellBuyTable from '../components/molecule/coins-table/CoinsSellBuyTable'
import { useLocation } from 'react-router-dom'
import { useApiContext } from '../context/FetchContext'
import useAuth from '../hooks/useAuth'

const Buy = () => {
  const [search, setSearch] = useState([])
  const { coinsData } = useApiContext()
  const auth = useAuth() // Usar el hook useAuth para obtener el contexto
  //const { login, loginAuth } = auth
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
        Elegir activo a comprar
      </Typography>
      <SearchBar onSearch={ handleSearch } />
      <Typography
        variant="h3"
        align="left"
        sx={ { color: 'red', marginBottom: '50px' } }
      >
        { search.map((result) => (
          <Typography key={ result.id }>{ result.name }</Typography>
        )) }
      </Typography>
      <CoinsSellBuyTable
        urlPathName={ urlPathName }
        btnText="Comprar"
        coinsData={ coinsData }
      />
    </Container>
  )
}

export default Buy