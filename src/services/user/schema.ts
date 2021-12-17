import { model } from "mongoose";
import mongoose from "mongoose"
import { IUserModel } from "../../interfaces/IUserModel";
import bcrypt from "bcrypt";

 const UserSchema = new mongoose.Schema<IUserModel>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },   
}, { timestamps: true })


UserSchema.static('checkCredentials', async function checkCredentials(email:string, plainPW:string) {
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
  });

// UserSchema.statics.checkCredentials = async function (email:string, plainPW:string) {
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
    
//   }  

export const UserModel = model<IUserModel>("Destination", UserSchema);