import { IAppConfig } from '../app';
import { JWTOKEN } from '../lib/JWT';
import { IModels } from '../models';
import { User } from './user';

export interface IResolvers {
    jwt: JWTOKEN;
    user: User;
}
export const Resolvers = (configs: IAppConfig, models: IModels): IResolvers => {
    return {
        jwt: new JWTOKEN(configs.JWTOKEN),
        user: new User(models),
    };
};
