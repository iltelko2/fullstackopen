/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'

import axios from 'axios'
const allCountries = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const oneCountry = 'https://studies.cs.helsinki.fi/restcountries/api/name/'
const api_key = import.meta.env.VITE_WEATHER_KEY
const weatherApi = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}`
const weatherIconApi = `https://openweathermap.org/img/wn/{REPLACETHIS}@2x.png`

const Country = ({ country, setCountry }) => {
  return (<p>{country.name.common} <button onClick={() => setCountry(country.name.common)}>Show</button></p>)
}

const Languages = ({ langs }) => {
  const keys = Object.keys(langs)

  return <><div style={{ fontWeight: 'bold' }}>Languages:</div> {keys.map(key => <p key={key}>{langs[key]}</p>)}</>
}

const CountryDetails = ({ country, temp }) => {
  if (country.name === undefined) return null;

  return (<div><h1>{country.name.common}</h1><p>Capital: {country.capital}</p><p>Area: {country.area}</p><Languages langs={country.languages} />
    <img src={country.flags['png']}></img>
    {temp.main === undefined ? (<></>) :
      (<><h1>Weather in {country.capital}</h1>
        <div>Temperature {(Math.floor((temp.main.temp - 273.15) * 100) / 100).toFixed(2)} celcius</div>
        <div>{temp.weather.map(w => (<img key={w.icon} src={weatherIconApi.replace("{REPLACETHIS}", w.icon)} />))}
        </div>
        <div>Wind {temp.wind.speed} m/s
        </div></>)
    }
  </div>)
}

const Countries = ({ countries, setCountry }) => {
  if (!countries) return null;

  if (countries.length > 10) return (<p>Too many matches, specify another filter...</p>)

  return (<div>
    {countries.map(country => <Country key={country.ccn3} country={country} setCountry={setCountry} />)}
  </div>
  );
}

function App() {

  const [countrySearch, setCountrySearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState({})
  const [temp, setTemp] = useState({})

  useEffect(() => {
    if (countrySearch) {
      axios.get(allCountries)
        .then(response => {
          console.log('response.data getall', response.data)
          setCountries(response.data)
        })
    }

    if (countries.filter(country => country.name.common.toLowerCase().includes(countrySearch.toLowerCase())).length == 1) {
      axios.get(`${oneCountry}${countries.filter(country => country.name.common.toLowerCase().includes(countrySearch.toLowerCase()))[0].name.common}`)
        .then(resp => {
          setCountry(resp.data)

          console.log(weatherApi)

          axios.get(`${weatherApi}&lon=${resp.data.capitalInfo.latlng[1]}&lat=${resp.data.capitalInfo.latlng[0]}`)
            .then((response) => {
              setTemp(response.data)
            })
        })
    }
  }, [countrySearch])

  const getSetCountry = (name) => {
    axios.get(`${oneCountry}${name}`)
      .then(resp => {
        setCountry(resp.data)
      })
  }

  return (
    <>
      <div>
        find countries: <input value={countrySearch} onChange={(event) => {
          setCountry({});
          setCountrySearch(event.target.value)
        }} />
      </div>
      {
        country.name !== undefined ? (<CountryDetails country={country} temp={temp} />)
          : (<Countries setCountry={getSetCountry} countries={countries.filter(country => country.name.common.toLowerCase().includes(countrySearch.toLowerCase()))} />)
      }
    </>

  )
}


export default App
