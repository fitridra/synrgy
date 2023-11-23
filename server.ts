import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import specs from './swagger';

import ApiCars from './routes/api/ApiCars';
import ApiAuth from './routes/api/ApiAuth';

const { PORT = 8000 } = process.env;

class Server {
  private app: Express;
  constructor() {
    this.app = express();

    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    this.app.use('/api/cars', ApiCars.routes());
    this.app.use('/api/auth', ApiAuth.routes());

  }
  run() {
    this.app.listen(PORT, () => {
      console.log('Server running on http://localhost:%s', PORT);
    });
  }
}

new Server().run();
