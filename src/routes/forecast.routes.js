import { Router } from 'express'
import { getCoordinatesByIp, getCurrentWeatherByCity, getForecastByCity } from '../controllers/forecast.controller'

const router = Router()

/**
 * @swagger
 * /v1/location:
 *  get:
 *   tags: ['Location']
 *   description: Devuelve la ciudad actual
 *   responses:
 *    200:
 *      description: ejecucion correcta
 */
router.get('/location', async (req, res) => {
  const location = await getCoordinatesByIp(req, res)
  res.json(location)
})

/**
 * @swagger
 * /v1/current/{city}:
 *   get:
 *    tags: ['Weather']
 *    description: Devuelve el estado del tiempo de la ciudad actual o de la que se ingrese por parámetro
 *    parameters:
 *     - in: path
 *       name: city
 *       required: false
 *       description: Nombre de la ciudad.
 *       schema:
 *        type: string
 *        default: ''
 *    responses:
 *     200:
 *      description: ejecucion correcta
 */
router.get('/current/:city?', async (req, res) => {
  const city = req.params.city
  const weatherByCity = await getCurrentWeatherByCity(req, res, city)
  res.json(weatherByCity)
})

/**
 * @swagger
 * /v1/forecast/{city}:
 *   get:
 *    tags: ['Weather']
 *    description: Devuelve el pronóstico del tiempo a 5 dias, de la ciudad actual o de la que se ingrese por parámetro
 *    parameters:
 *     - in: path
 *       name: city
 *       required: false
 *       description: Nombre de la ciudad.
 *       schema:
 *        type: string
 *        default: ''
 *    responses:
 *     200:
 *      description: ejecucion correcta
 */
router.get('/forecast/:city?', async (req, res) => {
  const city = req.params.city
  const forecastByCity = await getForecastByCity(req, res, city)
  res.json(forecastByCity)
})

export default router
