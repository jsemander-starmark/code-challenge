import { Express, NextFunction, Request, RequestHandler, Response, static as expressStatic } from 'express';
import { IAppConfig } from '../app';
import { IResolvers } from '../resolvers';
import Root from './root';

/**
 * Validates that a user is logged in
 */
export const Authorization = (resolvers: IResolvers): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.header('Authorization');
        if (authHeader) {
            if (!authHeader.match(/^Bearer (.*?)\.(.*?)\.(.*?)$/i)) {
                return next({
                    message: 'Incorrect Authorization header format',
                    statusCode: 401,
                });
            }
            try {
                const userId = await resolvers.jwt.isAuthorized(authHeader.split(' ')[1]);
                console.log('User Id', userId);
                req.user = await resolvers.user.isAuthorized(userId);
                return next();
            } catch (err) {
                return next(err);
            }
        }
        return next({
            message: 'Please make sure your request has an Authorization header',
            statusCode: 401,
        });
    };
};
export const formatErrors: (error: {
    location: string;
    param: string;
    msg: any;
    value: any;
}) => any = ({ location, msg, param, value }) => msg;
export const Routes = (app: Express, configs: IAppConfig, resolvers: IResolvers): void => {
    /**
     * Implements robots.txt
     */
    app.use('/robots.txt', (req: Request, res: Response) => {
        return res.type('text/plain').send('UserAgent: *\nDisallow: /');
    });
    
    /**
     * Documentation End-point
     */
    if (process.env.NODE_ENV !== 'production') {
        app.use('/docs', expressStatic('docs'));
    }
    
    /**
     * All routes
     */
    app.use('/', Root(configs, resolvers));
    
    /**
     * Base Route
     */
    app.use((req: Request, res: Response, next: NextFunction) => {
        return res.json(`${configs.Name} ${configs.Version}`);
    });
    
    /**
     * Define Error Handling
     */
    app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
        return res.status(err.statusCode || 500).send(err);
    });
};
