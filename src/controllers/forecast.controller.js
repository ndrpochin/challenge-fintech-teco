/* eslint-disable prefer-const */
const fetch = require('node-fetch')

export const getCoordinatesByIp = async (req, res) => {
  const response = await fetch('http://ip-api.com/json/?fields=61439')
  const { country, countryCode, regionName, city, zip, timezone, lat, lon } = await response.json()

  const location = {
    pais: country,
    codigoPais: countryCode,
    nombreRegion: regionName,
    ciudad: city,
    codigoPostal: zip,
    zonaHoraria: timezone,
    latitud: lat,
    longitud: lon
  }

  return location
}

export const getCurrentWeatherByCity = async (req, res, city) => {
  let latitud, longitud, location
  if (city == null || city === 'undefined') {
    location = await getCoordinatesByIp(req, res)
  } else {
    location = await getCoordinatesByCity(req, res, city)
  }

  latitud = location.latitud
  longitud = location.longitud

  const estadoDelTiempo = await getWeatherOrForecast(req, res, latitud, longitud, true)

  location.estadoDelTiempo = estadoDelTiempo

  return location
}

export const getForecastByCity = async (req, res, city) => {
  let latitud, longitud, location
  if (city == null || city === 'undefined') {
    location = await getCoordinatesByIp(req, res)
  } else {
    location = await getCoordinatesByCity(req, res, city)
  }
  latitud = location.latitud
  longitud = location.longitud

  const pronostico = await getWeatherOrForecast(req, res, latitud, longitud, false)

  location.pronostico = pronostico
  return location
}

const getCoordinatesByCity = async (req, res, city) => {
  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=eba73b44272b0bf6061fc972902d39a5`)
  const geocodingArray = await response.json()

  if (geocodingArray.length === 0) return { error: 'No se pudo encontrar la ciudad' }

  const { name, lat, lon } = geocodingArray.shift()
  const location = {
    ciudad: name,
    latitud: lat,
    longitud: lon
  }

  return location
}

const getWeatherOrForecast = async (req, res, latitud, longitud, weather = true) => {
  let responseClima, pronostico
  if (weather) {
    responseClima = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=eba73b44272b0bf6061fc972902d39a5&units=metric&lang=es`)
    const dataClima = await responseClima.json()
    pronostico = {
      descripcion: dataClima.weather[0].description,
      temperatura: dataClima.main.temp,
      presion: dataClima.main.pressure,
      humedad: dataClima.main.humidity,
      visibilidad: dataClima.visibility,
      viento: dataClima.wind.speed
    }
  } else {
    responseClima = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitud}&lon=${longitud}&appid=eba73b44272b0bf6061fc972902d39a5&units=metric&lang=es`)

    const dataClima = await responseClima.json()

    pronostico = dataClima.list.map(item => {
      const result = {
        descripcion: item.weather[0].description,
        temperatura: item.main.temp,
        presion: item.main.pressure,
        viento: item.wind.speed,
        visibilidad: item.visibility,
        fechayhora: item.dt_txt
      }
      return result
    })
  }
  return pronostico
}
