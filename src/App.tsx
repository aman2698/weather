import React, { useCallback, useEffect } from 'react';
import './App.css';
import Search from './components/Search';
import { getCityFromCord, getWeatherData } from './services/apis';
import Weather from './components/weather';
import { Backdrop, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import { MyContext } from './services/context';
import { debounce } from 'lodash';

let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
function App() {
  const [city, setCity] = React.useState('');
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);
  const [tempType, setTempType] = React.useState<boolean>(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            navigator.geolocation.getCurrentPosition(debounceFn, error);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(debounceFn, error, options)
          } else if (result.state === "denied") {
            console.log('denied')
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  }, [])

  const success = async (pos: any) => {
    try {
      const city = await getCityFromCord(pos.coords.latitude, pos.coords.longitude)
      setCity(city.data[0].name)
    } catch (error) {
      toast.error('city Not found')
      setLoading(false)
      setData(null)
      setLatitude(null)
      setLongitude(null)
    }
  }

  const debounceFn = useCallback(debounce(success, 1000), []);


  useEffect(() => {
    if (latitude && longitude) {
      getWeather()
    }
  }, [latitude, longitude])

  const getWeather = async () => {
    try {
      let data = await getWeatherData(latitude, longitude)
      setData(data.data)
      console.log(data.data);
    } catch (error) {
      toast.error('Weather Data not found')
      setLoading(false)
      setData(null)
      setLatitude(null)
      setLongitude(null)
    }
  }
  const error = () => {
    console.log('error');
    
  }

  return (
    <MyContext.Provider value={{ city, setCity, tempType, setTempType, setLatitude, setLongitude, setLoading, setData, data }}>
      <div className="App">
        <div className="App-header">
          <div className='container'>
          <header>React Weather App</header>
          <Search />
          <Weather />
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>

          </div>

        </div>
      </div>

    </MyContext.Provider>
  );
}

export default App;
