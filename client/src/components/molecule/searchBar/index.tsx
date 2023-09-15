import {useState} from 'react'
import { InputBase, Paper, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const SearchBar = ({onSearch}) => {
  const [searchCoin, setSearchCoin] = useState('')

  const handleSearch = () => {
    // Hacer la solicitud a la API usando fetch o axios aquí
    fetch(`https://binance-production.up.railway.app/api/v1/cryptocurrencies?search=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        // Llamar a la función de búsqueda con los datos recibidos de la API
        onSearch(data);
      })
      .catch((error) => {
        console.error('Error al buscar moneda:', error);
      });
  }

  const handleChange = (event) => {
    setSearchCoin(event.target.value);
  };

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
      <IconButton sx={ { p: '10px' } } aria-label="search" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={ { ml: 1, flex: 1 } }
        placeholder="Buscar..."
        inputProps={ { 'aria-label': 'search' } }
        value={searchCoin}
        onChange={handleChange}
      />
    </Paper>
  )
}

export default SearchBar
