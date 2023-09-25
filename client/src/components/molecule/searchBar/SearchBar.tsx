import React, { useState } from 'react'
import {IconButton , InputBase, Paper} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useApiContext } from '../../../context/FetchContext'
import { useLoader } from '../../../context/LoaderProvider'
import { SEARCH_BAR } from './SearchBarStyles'

interface SearchBarProps {
  onSearch: (results: any) => void
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch
}) => {
  const { addLoading, removeLoading } = useLoader()
  const { coinsData } = useApiContext()
  const [searchCoin, setSearchCoin] = useState('')

  const handleSearch = () => {
    addLoading()
    const coinFilter = coinsData.filter(coin => coin.name.toLowerCase().includes(searchCoin))
    onSearch(coinFilter)
    removeLoading()
  }

  return (
    <Paper component="form" sx={ SEARCH_BAR.form } >
      <InputBase
        sx={ { ml: 1 } }
        placeholder="Ingresar moneda a comprar..."
        inputProps={ { 'aria-label': 'Ingresar moneda a comprar' } }
        value={ searchCoin }
        onChange={ (event) => setSearchCoin(event.target.value) }
      />
      <IconButton
        sx={ { p: '10px' , backgroundColor: '#FCD535'} }
        aria-label="Buscar moneda a comprar"
        onClick={ handleSearch }
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchBar
