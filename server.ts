import express, { Express, NextFunction, Request, Response } from 'express';
import apiRouter from './routes/api';
import swaggerUi from 'swagger-ui-express';
import specs from './swagger';

const { PORT = 8080 } = process.env;

class Server {
  private app: Express;
  constructor() {
    this.app = express();

    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    this.app.use('/api', apiRouter);

    // Handle not found errors
    this.app.use(this.notFoundHandler);

    // Handle other errors
    this.app.use(this.errorHandler);
  }

  private notFoundHandler(_: Request, res: Response, __: NextFunction) {
    res.status(404).json({
      message: 'Not found',
    });
  }

  private errorHandler(
    err: Error,
    _: Request,
    res: Response,
    __: NextFunction
  ) {
    console.log(err.stack);
    res.status(500).json({
      message: 'Internal server error',
      error: err.message,
    });
  }

  public run() {
    this.app.listen(PORT, () => {
      console.log('Server running on http://localhost:%s', PORT);
    });
  }
}

new Server().run();
