import app from './app'

// middleware de manejo de rutas inexistentes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

app.listen(app.get('port'))
console.log('Server on port ', app.get('port'))
