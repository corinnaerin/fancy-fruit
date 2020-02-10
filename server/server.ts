import express, { Application, Router, json, Request, Response } from 'express';
import { resolve, join } from 'path';
import * as log from 'fancy-log';
import errorHandler from './middleware/error-handler';
import Healthcheck from './routes/healthcheck';
import Sales from './routes/sales';

const notImplemented = (req: Request, res: Response) => {
  res.status(501)
      .send('API not yet implemented');
};

/**
 * My server!
 */
class Server {
  public app: Application;

  private port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

  constructor() {
    this.app = express();
    this.setup();
  }

  public start(): void {
    this.app.listen(this.port, () => {
      log.info(`Insecure node server started on ${this.port} ...`);
    });
  }

  private setup(): void {
    this.routes();

    if (process.env.WATCH) {
      this.setupWebpackDevMiddleware();
    } else {
      this.app.use(express.static(resolve(__dirname, '..', 'public')));

      this.app.get('/*', function(req, res) {
        res.sendFile(join(__dirname, '../public/index.html'), (err) => {
          if (err) {
            res.status(500).send(err);
          }
        });
      });
    }
  }

  private routes(): void {
    // nothing I can do about express.js violating this rule :(
    // eslint-disable-next-line new-cap
    const router = Router();

    router.use(json());

    router.get('/healthcheck', Healthcheck.get);
    router.get('/sales', Sales.getAllSalesForDateRange);

    // Just for the sake of showing how the API design would be
    router.get('/sales/:fruit', notImplemented); // get the sales for the date range for a single fruit.
    router.put('/sales/:fruit', notImplemented); // record the daily sales for a single fruit.  Request Body: FruitSales
    router.post('/sales', notImplemented); // record daily sales for all fruits. Request Body: SalesRecord

    this.app.use(errorHandler);

    this.app.use((request: Request, response: Response, next) => {
      log.info(`${request.method} ${request.originalUrl}`);
      next();
    });

    this.app.use('/api', router);

  }

  private setupWebpackDevMiddleware(): void {
    log.warn('Enabling webpack hot reloading. You should only see this message when developing locally.');
    // using require instead of import statements, so that these are not imported in production
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const webpackConfig = require('../webpack.config');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const webpack = require('webpack');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const webpackDevMiddleware = require('webpack-dev-middleware');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const webpackHotMiddleware = require('webpack-hot-middleware');

    // Enable hot reloading
    webpackConfig.entry.unshift('webpack-hot-middleware/client');
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    const compiler = webpack(webpackConfig);
    const options = {
      hot: true,
      https: false,
      publicPath: '/',
      historyApiFallback: {
        index: '/'
      },
      quiet: false,
      stats: 'minimal'
    };
    this.app.use(webpackDevMiddleware(compiler, options));
    this.app.use(webpackHotMiddleware(compiler));
  }
}

export default new Server();
