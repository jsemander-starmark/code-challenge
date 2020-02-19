import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    _id: mongoose.Schema.Types.ObjectId; 
    userName: string;  
    password: string,
    firstName: string,
    lastName: string,
    created_at?: Date;
    updated_at?: Date;
    enabled?: boolean
  }
  