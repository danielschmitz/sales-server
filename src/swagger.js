const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'Sales Server',
        description: 'Documentation API. https://github.com/danielschmitz/sales-server',
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
        CategoryResult: {
            id: 1,
            name: "Category Name",
            description: "Category Description"
        },
        Category: {
            name: "Category Name",
            description: "Category Description"
        },
        SupplierResult: {
            id: 1,
            companyName: "Supplier Company Name",
            contactName: "Supplier Contact Name",
            contactEmail: "Supplier Contact Email",
            address_id: 10,
            address: {
                id: 10,
                street: "Street Address",
                city: "City",
                region: "Region",
                postalCode: "Postal Code",
                country: "Country",
                phone: "Phone" 
            }
        },
        Supplier: {
            companyName: "Supplier Company Name",
            contactName: "Supplier Contact Name",
            contactEmail: "Supplier Contact Email",
            address: {
                street: "Street Address",
                city: "City",
                region: "Region",
                postalCode: "Postal Code",
                country: "Country",
                phone: "Phone" 
            }
        },
    }
}

const outputFile = './src/swagger.json'
const endpointsFiles = [
    './src/api/category.js', 
    './src/api/supplier.js'
]

swaggerAutogen(outputFile, endpointsFiles, doc)

