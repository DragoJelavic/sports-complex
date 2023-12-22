import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sports complex API',
      version: '1.0.0',
      description: 'Sports program management application',
    },
  },
  apis: ['./src/routes/*.ts'],
}

export default swaggerJsdoc(options)
