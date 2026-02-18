const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'JWT Backend API',
      version: '1.0.0',
      description: 'API documentation for JWT Backend with User, Category, SubCategory, and Product management',
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            _id: {
              type: 'string',
              description: 'User ID',
            },
            email: {
              type: 'string',
              description: 'User email',
            },
            password: {
              type: 'string',
              description: 'User password (hashed)',
            },
            role: {
              type: 'string',
              enum: ['admin', 'user'],
              default: 'user',
            },
          },
        },
        Category: {
          type: 'object',
          required: ['name'],
          properties: {
            _id: {
              type: 'string',
            },
            name: {
              type: 'string',
              description: 'Category name',
            },
            description: {
              type: 'string',
            },
          },
        },
        SubCategory: {
          type: 'object',
          required: ['name', 'categoryId'],
          properties: {
            _id: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            categoryId: {
              type: 'string',
              description: 'Reference to Category',
            },
          },
        },
        Product: {
          type: 'object',
          required: ['name', 'category', 'price'],
          properties: {
            _id: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            category: {
              type: 'string',
            },
            subcategory: {
              type: 'string',
            },
            price: {
              type: 'number',
            },
            description: {
              type: 'string',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
