import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useState } from "react";
import Weather from "./components/Weather";
import { imagesWeather } from "./util/WeatherPictures";
import WeatherOfImput from "./components/WeatherOfImput";

function App() {
  const [cityClimateInfo, setCityClimateInfo] = useState(null);
  const hanledSumit = (event) => {
    event.preventDefault();

    const API_KEY = "e4912d9ce2773cb304639766fa75b4c7";
    const cityName = event.target.cityName.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

    axios
      .get(url)
      .then(({ data }) => setCityClimateInfo(data))
      .catch((err) => console.log(err));
  };

  const [weatherInfo, setWeatherInfo] = useState(null);
  const success = (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    const API_KEY = "e4912d9ce2773cb304639766fa75b4c7";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    axios
      .get(url)
      .then(({ data }) => setWeatherInfo(data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  return (
    <>
      <div className="bg-black ">
        {
          cityClimateInfo ?
        <main
         className={` min-h-screen font-lato text-white flex justify-center items-center flex-col gap-8 max-w-screen-xl bg-cover  mx-auto px-2 bg-center  ${
            imagesWeather[cityClimateInfo.weather[0].icon]
          }`}
        >
          <form className="flex rounded-md overflow-hidden max-w-max mx-auto" onSubmit={hanledSumit} action="">
            <input placeholder="Example:Medellin" className="text-black" id="cityName" type="text" />
            <button className=" bg-black/70">Change of City</button>
          </form>
          
            
             <WeatherOfImput cityClimateInfo={cityClimateInfo} />
             
          
         
        </main> : <main
         className={` min-h-screen font-lato text-white flex justify-center items-center flex-col gap-8 max-w-screen-xl bg-cover  mx-auto px-2 bg-center  ${
            imagesWeather[weatherInfo?.weather[0].icon]
          }`}
        >
          <form className="flex rounded-md overflow-hidden max-w-max mx-auto" onSubmit={hanledSumit} action="">
            <input placeholder="Example:Medellin" className="text-black" id="cityName" type="text" />
            <button className=" bg-black/70">Change of City</button>
          </form>
          
            
        
              <Weather weatherInfo={weatherInfo}/> 
          
         
        </main>
}
      </div>
    </>
  );
}

export default App;
