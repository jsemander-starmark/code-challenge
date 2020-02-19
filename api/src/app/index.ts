/**
 * START for Typescript
 */
declare global {
    namespace Express {
        export interface Request {
            user: IUser;
        }
    }
}
/**
 * END for Typescript
 */

import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as expressValidator from 'express-validator';
import * as helmet from 'helmet';
import { Server } from 'http';
import { IJWTConfig } from '../lib/JWT';
import { IResolvers } from '../resolvers';
import { Routes } from '../routes';
import { IUser } from '../interfaces/user.interface';

export interface IApp {
    app: express.Express;
    server: Server;
}
export interface IAppConfig {
    [key: string]: any;
    JWTOKEN: IJWTConfig;
    Name: string;
    Port: number;
    Timezone: string;
}
export interface IErrorResponse {
    errors?: { [key: string]: any; };
    message: string;
    statusCode: number;
}
export const App = (configs: IAppConfig, resolvers: IResolvers): IApp => {
    /**
     * Express application
     */
    const app: express.Express = express();
    
    /**
     * Set port
     */
    app.set('port', configs.Port);
    
    /**
     * parse application/json
     */
    app.use(bodyParser.json());
    
    /**
     * parse application/x-www-form-urlencoded
     */
    app.use(bodyParser.urlencoded({
        extended: false,
    }));
    
    /**
     * supports cross browser requests
     */
    app.use(cors());
    
    /**
     * remove harmful headers
     */
    app.use(helmet());
    
    /**
     * Add validator middleware
     */
    app.use(expressValidator());
    
    /**
     * Create routes
     */
    Routes(app, configs, resolvers);

    /**
     * Expose application to port
     */
    const server: Server = app.listen(configs.Port, () => {
        console.log('Listening on port ', configs.Port);
    });
    
    /**
     * Return application object
     */
    return {
        app,
        server,
    };
};
