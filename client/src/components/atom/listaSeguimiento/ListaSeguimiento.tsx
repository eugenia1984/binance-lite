import React from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { FAV_LIST } from './ListaSeguimientoStyles'
import useFavorites from '../../../hooks/useFavorites'

const ListaSeguimiento: React.FC = () => {
    const navigate = useNavigate()
    const { favoritesList } = useFavorites()

    return (
        <Grid container maxWidth="lg" id="container-favorites">
            { !favoritesList &&
                <Typography variant="h3">
                    Sin favoritos
                </Typography>
            }
            { favoritesList && favoritesList.length > 0 &&
                favoritesList.map((coin) => (
                    <Grid item xs={ 12 } sm={ 6 } md={ 4 } key={ coin.cryptoId }>
                        <Box sx={ FAV_LIST.boxCard } className="crypto-favorite-card">
                            <Grid container sx={ { minHeight: '140px' } }>
                                <Grid item xs={ 6 } sx={ FAV_LIST.gridItemCoin } >
                                    <Box
                                        component='img'
                                        src={ coin.iconUrl }
                                        height={ 40 }
                                        width={ 40 }
                                        alt={ coin.name }
                                    />
                                    <Box >
                                        <Typography variant="h4">
                                            { coin.name }
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={ 6 } sx={ FAV_LIST.gridItemBuy }>
                                    <Button
                                        variant='contained'
                                        size='small'
                                        aria-label="comprar"
                                        onClick={ () => navigate(`/buy/screen?coin=${ coin.cryptoId }`) }
                                    >
                                        Comprar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid >
                ))
            }
        </Grid >
    )
}

export default ListaSeguimiento
