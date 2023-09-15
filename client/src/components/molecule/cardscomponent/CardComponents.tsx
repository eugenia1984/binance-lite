
import React from 'react'
import { useApiContext } from '../../../context/FetchContext'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { CARDS_STYLES } from './CardsComponentsStyles'

const CardsComponents: React.FC = () => {
    const { coinsData } = useApiContext()

    return (
        <Box component="div" sx={CARDS_STYLES.div} >
            {
                coinsData.map(item => (
                    <Card key={item.uuid} sx={CARDS_STYLES.card} >
                        <Grid container sx={CARDS_STYLES.gridContainer}>
                            <Grid item xs={6} sx={CARDS_STYLES.gridItem}>
                                <CardMedia
                                    sx={{ width: 50 }}
                                    component='img'
                                    image={item.iconUrl}
                                    height={50}
                                    width={50}
                                    alt={item.name}
                                />
                                <CardContent >
                                    <Typography variant="h3" color="initial">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="h3" color="initial">
                                        {item.symbol}
                                    </Typography>
                                </CardContent>
                            </Grid>
                            <Grid item xs={6} sx={CARDS_STYLES.gridItem}>
                                <Typography variant="h4" color="initial">
                                    {item.currentPrice.substring(0, 6)}
                                </Typography>
                                <CardActions sx={{ width: 100 }} >
                                    <Button variant='contained' size='small' aria-label="comprar">
                                        Comprar
                                    </Button>
                                </CardActions>
                            </Grid>
                        </Grid>
                    </Card>
                ))
            }
        </Box>

    )
}

export default CardsComponents