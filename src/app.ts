import express, { Application } from 'express';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import routes from './routes';
import dbConnect from './dbconfig';

const app: Application = express();

require('dotenv').config();

/**
 * options for cors midddleware
 * Documentation: https://expressjs.com/en/resources/middleware/cors.html
 */
const options: CorsOptions = {
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE'
};

// middleware
app.use(helmet());
app.use(cors(options));
app.use(express.json());
app.set('port', process.env.PORT || 8080);
app.options('*', cors(options)); //enable pre-flight

// use all endpoints
app.use(routes);

try {
  app.listen(app.get('port'), async () => {
    await dbConnect();
    console.log('the server is running on port', app.get('port'));
  });
} catch (err) {
  console.log(err);
}
