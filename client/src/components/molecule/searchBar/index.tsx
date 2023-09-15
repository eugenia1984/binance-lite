import { useState } from 'react'
import { InputBase, Paper, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useApiContext } from '../../../context/FetchContext'
import { useLoader } from '../../../context/LoaderProvider'

const SearchBar= ({ onSearch }) => {
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
    <Paper
      component="form"
      sx={ {
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '20px',
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        marginBottom: '30px',
      } }
    >
      <InputBase
        sx={ { ml: 1, flex: 1 } }
        placeholder="Ingresar moneda a comprar..."
        inputProps={ { 'aria-label': 'Ingresar moneda a comprar' } }
        value={ searchCoin }
        onChange={ (event) => setSearchCoin(event.target.value) }
      />
      <IconButton
        sx={ { p: '10px' } }
        aria-label="Buscar moneda a comprar"
        onClick={ handleSearch }
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchBar
