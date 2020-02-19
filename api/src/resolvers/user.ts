import { Resolver } from '../lib/Resolver';
import { IModels } from '../models';
import { UserModel } from '../models/users';
import { Schema } from 'mongoose';
import { IUser } from 'src/interfaces/user.interface';

export class User extends Resolver<IModels> {
    /**
     * Get user by userName
    */
    public async getByUsername(userName: string): Promise<IUser | null> {
        return await UserModel.findOne({userName: userName});
    }

    /**
     * 
     * @param id 
     * @param verbose 
     */
    public async createUser(payload: any) : Promise<IUser | null> {     
        return await UserModel.create(payload);
    }
    
    /**
     * Get user by id and validates that they are authorized
     */
    public async isAuthorized(id: Schema.Types.ObjectId, verbose: boolean = true): Promise<IUser> {
        const defaultMessage = 'Your userName/password combination is incorrect';
        // TODO: Find user by id
        const user = await UserModel.findById(id);
        
        if (!user) {
            return Promise.reject<any>({
                message: verbose ? 'There was no user record found' : defaultMessage,
                statusCode: 404,
            });
        }
        if (!user.enabled) {
            return Promise.reject<any>({
                message: verbose ? 'Your user has been disabled' : defaultMessage,
                statusCode: 404,
            });
        }
        if (!user.password) {
            return Promise.reject<any>({
                message: verbose ? 'Your password has expired' : defaultMessage,
                statusCode: 404,
            });
        }
        return user;
    }
}
