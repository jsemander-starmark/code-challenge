import * as mongoose from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { IUser } from 'src/interfaces/user.interface';
import { NextFunction } from 'express';
const Schema = mongoose.Schema;

export const UserSchema: any = new Schema({
    userName: {
        required: true,
        type: String,
        unique: true,
    },
    enabled: {
        required: false,
        default: true,
        type: Boolean,
    },
    firstName: {
        required: true,
        type: String,
    },
    lastName: {
        required: true,
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    createdAt : {
        type : Date,
        default: new Date(),
        required: false
    }
});
/*
* Converting password to hash before saving
*/
UserSchema.pre('save', async function(this: any , next: NextFunction) {
    try {  
      let user = this;
      if (user.isModified('password')) {
        let salt = await bcryptjs.genSalt(10);
        const hashed = await bcryptjs.hash(user['password'], salt);
        user['password'] = hashed;    
       }
  
      return next();
    }
    catch (err) {
      return next(err);
    }
  });

export const UserModel = mongoose.model<IUser>('User', UserSchema);


