import { model } from "mongoose";
import mongoose from "mongoose"
import bcrypt from "bcrypt";

import { IstaticCheck, IUserDocument } from '../../interfaces/IUserDocument';



 const UserSchema = new mongoose.Schema<IUserDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },   
}, { timestamps: true })


// UserSchema.static('checkCredentials', async function (email:string, plainPW:string) {
//     console.log("EMAIL:", email)
//     console.log("pw:",plainPW)
//     //finds user by email
//     //if user => compare PWs 
//     const user = await this.findOne({email: email})  
  
//     if (user) {
//         const passwordMatch = await bcrypt.compare(plainPW, user.password)
//         if (passwordMatch) {
//             return user
//         } else {
//             return null
//         }
//     } else {
  
//       return undefined
//     }
//   });

UserSchema.statics.checkCredentials = async function (email:string, plainPW:string) {
    console.log("EMAIL:", email)
    console.log("pw:",plainPW)
    //finds user by email
    //if user => compare PWs 
    const user = await this.findOne({email: email})  
  
    if (user) {
        const passwordMatch = await bcrypt.compare(plainPW, user.password)
        if (passwordMatch) {
            return user
        } else {
            return null
        }
    } else {
  
      return undefined
    }
    
  }  

export const UserModel = model<IUserDocument>("Destination", UserSchema);