import app from '../src/app'
import request from 'supertest'

describe('Tests de /v1/location',
  () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).get('/v1/location').send()
      expect(response.status).toBe(200)
    })

    test('deberia tener un content-type: application/json', async () => {
      const response = await request(app).get('/v1/location').send()
      expect(response.header['content-type']).toEqual(expect.stringContaining('json'))
    })

    test('deberia responder un objeto ', async () => {
      const response = await request(app).get('/v1/location').send()
      expect(response.body.pais).toBeDefined()
      expect(response.body.codigoPais).toBeDefined()
      expect(response.body.nombreRegion).toBeDefined()
      expect(response.body.ciudad).toBeDefined()
      expect(response.body.codigoPostal).toBeDefined()
      expect(response.body.zonaHoraria).toBeDefined()
    })
  })

describe('Tests de /v1/current', 
  () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).get('/v1/current').send()

      expect(response.status).toBe(200)
    })
    test('deberia tener un content-type: application/json', async () => {
      const response = await request(app).get('/v1/current').send()
      expect(response.header['content-type']).toEqual(expect.stringContaining('json'))
    })
  })

describe('Tests de /v1/forecast',
  () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).get('/v1/forecast').send()

      expect(response.status).toBe(200)
    })

    test('deberia tener un content-type: application/json', async () => {
      const response = await request(app).get('/v1/forecast').send()
      expect(response.header['content-type']).toEqual(expect.stringContaining('json'))
    })
  })
