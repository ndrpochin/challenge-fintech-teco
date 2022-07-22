import express from 'express'
import forecastRoutes from './routes/forecast.routes'
const swaggerUI = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const path = require('path')

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Weather Challenge API',
      description: 'Developer Applicant Interview Test',
      contact: {
        name: 'Nadir Jaramillo'
      },
      servers: ['http://localhost:3000']
    }
  },
  // apis: ['index.js', './routes/forecast.routes.js']
  apis: [`${path.join(__dirname, './routes/*.js')}`]
}

const app = express()

app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => {
  res.json({ welcome: 'Para ver la documentacion: localhost:3000/docs' })
})

app.use('/v1', forecastRoutes)
app.use('/docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsdoc(swaggerOptions)))

export default app
