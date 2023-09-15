import React from 'react'
import { useApiContext } from "../../../context/FetchContext"
import { Box, Card, CardActions, CardContent, CardMedia, Typography, IconButton, Grid, Button } from '@mui/material'
import { CARDS_STYLES } from "../../molecule/cardscomponent/CardsComponentsStyles"
import { useSwiper } from 'swiper/react'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import "./styleSlider.css"
import { Autoplay, Mousewheel, Pagination, Navigation, EffectCoverflow } from 'swiper/modules'
import { useNavigate } from 'react-router-dom'

export const SlideNextButton = () => {
    const swiper = useSwiper()

    return (
        <IconButton aria-label="proximo" onClick={ () => swiper.slideNext() } >
            <KeyboardArrowRightRoundedIcon sx={ { width: 30, height: 30, color: "primary" } } />
        </IconButton>
    );
}

export const SlidePrevButton = () => {
    const swiper = useSwiper()

    return (
        <IconButton
            aria-label="anterior"
            onClick={ () => swiper.slidePrev() }
        >
            <KeyboardArrowLeftRoundedIcon
                sx={ { width: 30, height: 30, color: "primary" } }
            />
        </IconButton>
    );
}

const SliderCupones: React.FC = () => {
    const { coinsData } = useApiContext()
    const navigate = useNavigate()

    return (
        <Swiper
            cssMode={ true }
            loop={ true }
            mousewheel={ true }
            autoplay={ {
                delay: 4000,
                disableOnInteraction: false,
            } }
            pagination={ { clickable: true, } }
            breakpoints={ {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    navigation: false,
                },
                640: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 1,
                    spaceBetween: 5,
                },
                900: {
                    slidesPerView: 1.9,
                    spaceBetween: 2,
                    navigation: true
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 5,
                },
            } }
            modules={ [
                Autoplay, Mousewheel, Pagination, Navigation, EffectCoverflow
            ] }
            className="mySwiper"
        >
            { coinsData.slice(0, 5).map((coin) => (
                <SwiperSlide key={ coin.uuid }>
                    <Box>
                        <Card sx={ CARDS_STYLES.card } >
                            <Grid
                                container
                                sx={ CARDS_STYLES.gridContainer }
                            >
                                <Grid
                                    item
                                    xs={ 6 }
                                    sx={ CARDS_STYLES.gridItem }
                                >
                                    <CardMedia
                                        sx={ { width: 50 } }
                                        component='img'
                                        image={ coin.iconUrl }
                                        height={ 50 }
                                        alt={ coin.name }
                                    />
                                    <CardContent >
                                        <Typography variant="h3" color="initial">
                                            { coin.name }
                                        </Typography>
                                        <Typography variant="h3" color="initial">
                                            { coin.symbol }
                                        </Typography>
                                    </CardContent>
                                </Grid>
                                <Grid item xs={ 6 } sx={ CARDS_STYLES.gridItem }>
                                    <Typography variant="h4" color="initial">
                                        { coin.currentPrice.substring(0, 6) }
                                    </Typography>
                                    <CardActions sx={ { width: 100 } } >
                                        <Button
                                            onClick={ () => navigate(`/buy?coin=${ coin.uuid }`) }
                                            variant='contained'
                                            size='small'
                                            aria-label="comprar"
                                        >
                                            Comprar
                                        </Button>
                                    </CardActions>
                                </Grid>
                            </Grid>
                        </Card>
                    </Box>
                </SwiperSlide>
            )) }
            <div className='swiper-div-buttons'>
                <div><SlidePrevButton /></div>
                <div><SlideNextButton /></div>
            </div>
        </Swiper>
    )
}

export default SliderCupones



