
import { useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { useState } from 'react'
import Weather from './components/Weather'
import {imagesWeather} from './util/WeatherPictures'
function App() {
const [weatherInfo, setWeatherInfo] = useState(null)  
 const success=(pos)=>{

const lat=pos.coords.latitude
const lon=pos.coords.longitude

const API_KEY='e4912d9ce2773cb304639766fa75b4c7'
const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
axios
.get(url)
.then(({data})=>setWeatherInfo(data))
.catch((err)=>console.log(err))
 }
useEffect(()=>{
navigator.geolocation.getCurrentPosition(success)
},[])


  return (
    <>
    <div className='bg-black'>
      <main  className={` min-h-screen font-lato text-white flex justify-center items-center max-w-screen-xl bg-cover  mx-auto px-2 bg-center  ${imagesWeather[weatherInfo?.weather[0].icon]}`}>
        
<Weather weatherInfo={weatherInfo}/>
      </main>
      </div>
    </>
  )
}

export default App
