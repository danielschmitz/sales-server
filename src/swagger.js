const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'Sales Server',
        description: 'Documentation API. https://github.com/danielschmitz/sales-server <br/><br/>',
        version: '1.0',
        contact: {
            name: 'Daniel Schmitz',
            email: 'danieljfa@gmail.com',
            url: 'https://github.com/danielschmitz'
        }
    },
    host: null,
    schemes: ['http', 'https'],
    basePath: '/api',
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            scheme: 'bearer',
            in: 'header',
        },
    },
    security: [{ bearerAuth: [] }],
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
        UserResult: {
            id: 1,
            name: "User Name",
            email: "user@mail.com"
        },
        User: {
            name: "User Name",
            email: "user@mail.com",
            password: "123@456"
        },
        SupplierResult: {
            id: 1,
            companyName: "Supplier Company Name",
            contactName: "Supplier Contact Name",
            contactEmail: "supplier@email.com",
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
        SupplierSimpleResult: {
            id: 1,
            companyName: "Company Test",
            contactName: "Contact Test",
            contactEmail: "supplier@email.com",
            address_id: 6,
            street: "Street Test",
            city: "City Test",
            region: "Region Test",
            postalCode: "Postal Test",
            country: "Country Test",
            phone: "111 222 Test"
        },
        Supplier: {
            companyName: "Supplier Company Name",
            contactName: "Supplier Contact Name",
            contactEmail: "supplier@email.com",
            address: {
                street: "Street Address",
                city: "City",
                region: "Region",
                postalCode: "Postal Code",
                country: "Country",
                phone: "Phone"
            }
        },
        ShipperResult: {
            id: 1,
            companyName: "Shipper Company Name",
            contactName: "Shipper Contact Name",
            contactEmail: "supplier@email.com",
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
        ShipperSimpleResult: {
            id: 1,
            companyName: "Company Test",
            contactName: "Contact Test",
            contactEmail: "supplier@email.com",
            address_id: 6,
            street: "Street Test",
            city: "City Test",
            region: "Region Test",
            postalCode: "Postal Test",
            country: "Country Test",
            phone: "111 222 Test"
        },
        Shipper: {
            companyName: "Shipper Company Name",
            contactName: "Shipper Contact Name",
            contactEmail: "supplier@email.com",
            address: {
                street: "Street Address",
                city: "City",
                region: "Region",
                postalCode: "Postal Code",
                country: "Country",
                phone: "Phone"
            }
        },
        ProductResult: {
            id: 1,
            name: "Chef Anton's Cajun Seasoning",
            quantityPerUnit: "48 - 6 oz jars",
            unitsInStock: 53,
            unitPrice: 22.10,
            supplier_id: 1,
            category_id: 1,
            supplier: {
                companyName: "Supplier Company Name",
                contactName: "Supplier Contact Name",
                contactEmail: "supplier@email.com",
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
            category: {
                id: 1,
                name: "Category Name",
                description: "Category Description"
            }
        },
        ProductSimpleResult: {
            id: 1,
            name: "Chef Anton's Cajun Seasoning",
            quantityPerUnit: "48 - 6 oz jars",
            unitsInStock: 53,
            unitPrice: 22.10,
            supplier_id: 1,
            category_id: 1,
            supplier_name: "Supplier Contact Name",
            supplier_company: "Supplier Company Name",
            supplier_email: "supplier@email.com",
            category_name: "Category Name"
        },
        Product: {
            name: "Chef Anton's Cajun Seasoning",
            quantityPerUnit: "48 - 6 oz jars",
            unitsInStock: 53,
            unitPrice: 22.10,
            supplier_id: 1,
            category_id: 1,
            supplier: {
                companyName: "Supplier Company Name",
                contactName: "Supplier Contact Name",
                contactEmail: "supplier@email.com",
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
            category: {
                id: 1,
                name: "Category Name",
                description: "Category Description"
            }
        }
    }
}

const outputFile = './src/swagger.json'
const endpointsFiles = [
    './src/api/hello-world.js',
    './src/api/auth.js',
    './src/api/user.js',
    './src/api/category.js',
    './src/api/supplier.js',
    './src/api/shipper.js',
    './src/api/product.js',
]

swaggerAutogen(outputFile, endpointsFiles, doc)

