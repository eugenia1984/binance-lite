import React from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface NotFoundProps { }

const NotFound: React.FC<NotFoundProps> = () => {
  const navigate = useNavigate()

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={ 4 }
      maxWidth="lg"
      sx={{minHeight: '85vh'}}
    >
      <Grid item xs={ 12 }>
        <Typography
          variant="h2"
          align="center"
          sx={ { padding: '2rem 1rem' } }
        >
          Ups! <br />No encontramos la página buscada.
        </Typography>
      </Grid>
      <Grid item xs={ 12 }>
        <Button
          onClick={ () => navigate('/market') }
          size='small'
          aria-label="volver a mercado"
          variant="contained"
          color="primary"
        >
          Volver a mercado
        </Button>
      </Grid>
    </Grid>
  )
}

export default NotFound