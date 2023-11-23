import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Car Management API',
      version: '1.0.0',
      description: 'Challenge 6 Synrgy',
    },
  },
  apis: ['./routes/**/*.ts'],
};

const specs = swaggerJsdoc(options);

export default specs;
