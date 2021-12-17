import { model } from "mongoose";
import mongoose from "mongoose"
import { IUserModel } from "../../interfaces/IUserModel";


 const UserSchema = new mongoose.Schema<IUserModel>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },   
}, { timestamps: true })


export const UserModel = model<IUserModel>("Destination", UserSchema);