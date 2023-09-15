import React, { useContext } from 'react'
import { useApiContext } from '../../../context/FetchContext'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { FAV_LIST } from './ListaSeguimientoStyles'
import AuthContext from '../../../context/AuthContext'

const ListaSeguimiento: React.FC = () => {
    const { coinsData } = useApiContext()
    const { favoritesList, setFavoritesList, auth } = useContext(AuthContext)

    const navigate = useNavigate()

    return (
        <>
            <Grid
                container
                maxWidth="lg"
                sx={ FAV_LIST.container }
            >
                { coinsData.length === 0 &&
                    <Typography variant="h5">
                        Sin favoritos
                    </Typography>
                }
                { coinsData.length > 0 &&
                    coinsData.slice(0, 6).map((coin) => (
                        <Grid
                            item
                            xs={ 12 }
                            sm={ 6 }
                            key={ coin.uuid }
                        >
                            <Box sx={ FAV_LIST.boxCard }>
                                <Grid
                                    container
                                    sx={ { minHeight: '140px' } }
                                >
                                    <Grid
                                        item
                                        xs={ 6 }
                                        sx={ FAV_LIST.gridItemCoin }
                                    >
                                        <Box
                                            sx={ { width: 30 } }
                                            component='img'
                                            src={ coin.iconUrl }
                                            height={ 30 }
                                            alt={ coin.name }
                                        />
                                        <Box >
                                            <Typography variant="h4">
                                                { coin.name }
                                            </Typography>
                                            <Typography variant="h5">
                                                { coin.symbol }
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={ 6 }
                                        sx={ FAV_LIST.gridItemBuy }
                                    >
                                        <Typography variant="h5">
                                            { coin.currentPrice.substring(0, 6) }
                                        </Typography>
                                        <Button
                                            variant='contained'
                                            size='small'
                                            aria-label="comprar"
                                            onClick={ () => navigate(`/buy/screen?coin=${ coin.uuid }`) }
                                        >
                                            Comprar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid >
                    )) }
            </Grid >
        </>
    )
}

export default ListaSeguimiento
