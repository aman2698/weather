import axios from "axios";
const appid = 'acfc0ccd3dac3d2fc462063689b77319'

export const getCityFromCord = (lat:any, lon:any) =>{
    return axios.get('http://api.openweathermap.org/geo/1.0/reverse', {params:{
        lat,
        lon,
        appid
    }})
}

export const getWeatherData = (lat:any, lon:any) =>{
    return axios.get('https://api.openweathermap.org/data/2.5/weather', {params:{
        lat,
        lon,
        appid
    }})
}


export const getLongLat = (q:any) =>{
    return axios.get('http://api.openweathermap.org/geo/1.0/direct', {params:{
        q,
        limit:5,
        appid
    }})
}