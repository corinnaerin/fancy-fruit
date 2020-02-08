import express from 'express';
import * as path from 'path';
import * as log from 'fancy-log';
import errorHandler from './middleware/error-handler';
import Healthcheck from './routes/healthcheck';

/**
 * My server!
 */
class Server {
  public app: express.Application;

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
      this.app.use(express.static(path.resolve(__dirname, '..', 'public')));

      this.app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'), (err) => {
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
    const router = express.Router();

    router.use(express.json());

    router.get('/healthcheck', Healthcheck.get);

    this.app.use(errorHandler);

    this.app.use((request: express.Request, response: express.Response, next) => {
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
