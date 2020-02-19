import { UserSchema, UserModel } from './users';
import { IUser } from 'src/interfaces/user.interface';
import * as mongoose from 'mongoose';

export interface IModels {
    user: IUser;
}
// export const Models = async (dbUrl: string): Promise<IModels> => {
//     try {
//         // TODO: Connect to chosen database, and pass model objects
//         const models = {
//             user: new UserModel(),
//         };
//         return models;
//     } catch (err) {
//         return Promise.reject(err);
//     }
// };

export const Models = async (dbUrl: string): Promise<any> => {
    try {
        // TODO: Connect to chosen database, and pass model objects        
        const db = await mongoose.connect(dbUrl,{useCreateIndex: true, useNewUrlParser: true , useUnifiedTopology : true})
        return db; 

    } catch (err) {
        return Promise.reject(err);
    }
};
