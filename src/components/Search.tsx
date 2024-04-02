import { Box, Button, FormControlLabel, FormGroup, Switch, TextField } from '@mui/material'
import React, { useContext } from 'react'
import RefreshIcon from '@mui/icons-material/Refresh';
import { getLongLat } from '../services/apis';
import { toast } from 'react-toastify';
import { MyContext } from '../services/context';
const Search: React.FC<any> = () => {
    const { city, setCity, setTempType, tempType, setLatitude, setLongitude, setLoading, setData } = useContext(MyContext);
    React.useEffect(() => {
        const getData = setTimeout(() => {
            setLoading(true)
            findCity()
        }, 2000)
        return () => clearTimeout(getData)
    }, [city])

    const findCity = async () => {
        try {
            if (city !== '') {
                const data = await getLongLat(city)
                setLatitude(data.data[0].lat)
                setLongitude(data.data[0].lon)
                setLoading(false)
            }
        } catch (error) {
            toast.error('city Not found')
            setLoading(false)
            setData(null)
            setLatitude(null)
            setLongitude(null)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTempType(event.target.checked);
    };

    const refreshData = () => {
        setLoading(false)
        setData(null)
        setLatitude(null)
        setLongitude(null)
        findCity()
    }
    return (
        <>
            <Box display={'flex'} width={'100%'} padding={'10px'} margin={'20px 0px 30px 0px'}>
                <Box flex={1} textAlign={'left'} padding='5px'>
                    <TextField
                        sx={{ height: '30px' }}
                        id="outlined-controlled"
                        label="City"
                        size="small"
                        value={city}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                setLoading(true)
                                findCity()
                            }
                          }}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setCity(event.target.value);
                        }}
                    />
                </Box>
                <Box flex={1} padding='5px'>
                    <Box display={'flex'} justifyContent={'flex-end'} gap={'5px'} paddingRight={'15px'} >
                        <FormGroup>
                            <FormControlLabel control={<Switch
                                checked={tempType}
                                color='secondary'
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />} label={!tempType ? "°C" : '°F'} />
                        </FormGroup>
                        <Button onClick={() => refreshData()} variant="contained" color='success' startIcon={<RefreshIcon />}>
                            Refresh
                        </Button>


                    </Box>


                </Box>
            </Box>
        </>
    )
}

export default Search