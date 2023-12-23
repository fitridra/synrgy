import express, { Express, NextFunction, Request, Response } from 'express';
import apiRouter from './routes/api';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import specs from './swagger';
import ResponseBuilder from './utils/ResponseBuilder';

const { PORT = 3000 } = process.env;

class Server {
  private app: Express;

  constructor() {
    this.app = express();

    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());

    // CORS configuration for actual requests
    const frontUrl = process.env.FRONT_URL || "https://synrgy.vercel.app";

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    
    this.app.use('/api', cors({ origin: frontUrl }));
    this.app.use('/api', apiRouter);

    this.app.use(this.notFoundHandler);
    this.app.use(this.errorHandler);
  }

  private notFoundHandler(_: Request, res: Response, __: NextFunction) {
    return ResponseBuilder.response({
      res,
      code: 404,
      message: 'resource, data or page not found',
      data: 'not found',
    });
  }

  private errorHandler(
    err: any,
    _: Request,
    res: Response,
    __: NextFunction
  ) {
    console.log(err.stack);
    return ResponseBuilder.response({
      res,
      code: err?.statusCode ?? 500,
      message: err.message,
      data: err.name,
    });
  }

  public run() {
    this.app.listen(PORT, () => {
      console.log('Server running on http://localhost:%s', PORT);
    });
  }
}

new Server().run();
