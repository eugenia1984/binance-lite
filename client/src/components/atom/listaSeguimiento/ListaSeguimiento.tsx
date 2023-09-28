import React, { useContext } from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { FAV_LIST } from './ListaSeguimientoStyles'
import FavoriteCoinContext from '../../../context/FavoriteCoinContext'

const ListaSeguimiento: React.FC = () => {
    const { favoritesList } = useContext(FavoriteCoinContext)
    const navigate = useNavigate()

    return (
        <Grid container maxWidth="lg" sx={ FAV_LIST.container }>
            { favoritesList.length === 0 &&
                <Typography variant="h3">
                    Sin favoritos
                </Typography>
            }
            { favoritesList.length > 0 &&
                favoritesList.map((coin) => (
                    <Grid item xs={ 12 } sm={ 6 } key={ coin.cryptoId }>
                        <Box sx={ FAV_LIST.boxCard }>
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
