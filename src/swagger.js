const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'Sales Server',
        description: 'Documentation API',
        version: '1.0',
        contact: {
            name: 'Daniel Schmitz',
            email: 'danieljfa@gmail.com',
            url: 'https://github.com/danielschmitz'
        }
    },
    host: 'localhost:3000',
    basePath: '/api',
    definitions: {
        Category: {
            name: "Category Name",
            description: "Category Description"
        },
    }
}

const outputFile = './src/swagger.json'
const endpointsFiles = ['./src/api/category.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
