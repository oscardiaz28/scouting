import { config } from "dotenv"
import { connectDB } from "../lib/db.js"
import { hashPassword } from "../lib/utils.js"
import { User } from "../models/user.model.js"
import mongoose from "mongoose"

config()
const createAdmin = async () => {
    try{
        await connectDB()
        const hashedPassword = await hashPassword("1234")
        const user = new User({
            username: "pedrogomez",
            email: "pedro@gmail.com",
            password: hashedPassword
        })
        await user.save()
        console.log("User creado exitosamente")
        await mongoose.disconnect()

    }catch(err){
        console.log("No se ha podido crear el user " + err.mesage)
    }
}
createAdmin()