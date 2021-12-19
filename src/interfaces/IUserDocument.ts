
import { Document, Model } from 'mongoose';

export interface IUserDocument extends Document {
    name: string
    email: string
    password: string
    role: "host" | "guest"
    _id: string

    checkCredentials(): string
}

export interface IstaticCheck extends Model<IUserDocument> {
    checkCredentials(email:string, password: string): IUserDocument | null
}

