import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { MyContext } from '../services/context';
import { AnimationWrapper } from './Animation';
import Loader from './Loader';



const Weather: React.FC<any> = () => {
    const { tempType, data, loading } = useContext(MyContext);

    const converter = (val: any) => {
        if (tempType) {
            let valNum = parseFloat(val);
            return ((valNum - 273.15) * 9 / 5 + 32).toFixed(2);
        } else {
            let valNum = parseFloat(val);
            return (valNum - 273.15).toFixed(2)
        }
    }

    const getTime = (timeStamp: any) => {
        return `${new Date(timeStamp * 1000).getHours()} : ${new Date(timeStamp * 1000).getMinutes()}`
    }
    return (
        <>
            {!loading ? (
                <AnimationWrapper>
                    {data?.main && (
                        <Box display={'flex'} padding={'30px 25px'} sx={{ background: 'white', borderRadius: '10px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                            <Box flex={1}>

                                <>
                                    <Box display={'flex'}>
                                        <Box flex={1} display={'flex'}>
                                            <Typography sx={{ fontSize: '28px' }}>{converter(data?.main?.temp)} {tempType ? '°F' : '°C'} </Typography> <Typography sx={{ position: 'relative', top: '14px', textTransform: 'capitalize' }}>&nbsp;| {data?.weather[0].description}</Typography>
                                        </Box>
                                        <Box flex={1}>
                                            <img id="wicon" style={{ position: 'relative', top: '5px', transform: 'scale(2)' }} src={`http://openweathermap.org/img/w/${data?.weather[0].icon}.png`} alt="Weather icon"></img>
                                        </Box>
                                    </Box>
                                    <Typography variant="h4" component="div">
                                        {data.name}, {data.sys.country}
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary">
                                        High- {converter(data?.main?.temp_max)}     Low-     {converter(data?.main?.temp_min)}
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary" gutterBottom>
                                        Feels like- {converter(data?.main?.feels_like)}
                                    </Typography>
                                    <Box display={'flex'}>
                                        <Box flex={1}>
                                            <Typography sx={{ textTransform: 'capitalize', textAlign: 'left' }}>Weather Info</Typography>
                                        </Box>
                                        <Box flex={1}>
                                        </Box>
                                    </Box>
                                    <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                                        <Grid item xs={6}>
                                            <Box display={'flex'}>
                                                <img style={{ height: '50px' }} src={'img/sunrise.svg'} alt="sunrise" />
                                                <Box sx={{ padding: '1px 10px', textAlign: 'left' }}>
                                                    <Typography>{getTime(data?.sys?.sunrise)}</Typography>
                                                    <Typography>{'Sunrise'}</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box display={'flex'}>
                                                <img style={{ height: '50px' }} src={'img/sunset.svg'} alt="sunrise" />
                                                <Box sx={{ padding: '1px 10px', textAlign: 'left' }}>
                                                    <Typography>{getTime(data?.sys?.sunset)}</Typography>
                                                    <Typography>{'Sunset'}</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box display={'flex'}>
                                                <img style={{ height: '50px' }} src={'img/wind.svg'} alt="sunrise" />
                                                <Box sx={{ padding: '1px 10px', textAlign: 'left' }}>
                                                    <Typography>{data?.wind?.speed} meter/sec</Typography>
                                                    <Typography>{'Wind Speed'}</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box display={'flex'}>
                                                <img style={{ height: '50px' }} src={'img/direction.svg'} alt="sunrise" />
                                                <Box sx={{ padding: '1px 10px', textAlign: 'left' }}>
                                                    <Typography>{data?.wind?.deg}°N</Typography>
                                                    <Typography>{'Wind Direction'}</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box display={'flex'}>
                                                <img style={{ height: '50px' }} src={'img/humadity.svg'} alt="sunrise" />
                                                <Box sx={{ padding: '1px 10px', textAlign: 'left' }}>
                                                    <Typography>{data.main.humidity}%</Typography>
                                                    <Typography>{'Humadity'}</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box display={'flex'}>
                                                <img style={{ height: '50px' }} src={'img/pressure.svg'} alt="sunrise" />
                                                <Box sx={{ padding: '1px 10px', textAlign: 'left' }}>
                                                    <Typography>{data.main.pressure} hPa</Typography>
                                                    <Typography>{'Pressure'}</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>

                                    </Grid>
                                </>


                            </Box>

                        </Box>
                    )}
                </AnimationWrapper>
            ) : <Loader />}
        </>
    )
}

export default Weather