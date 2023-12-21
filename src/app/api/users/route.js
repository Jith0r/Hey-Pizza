import mongoose from "mongoose";
import { User } from '../../models/User'
import { isAdmin } from "../auth/[...nextauth]/route";


// Récupérer tous les utilisateurs
export async function GET() {
    mongoose.connect(process.env.MONGO_URL);

    //Sécurité pour pas autoriser n'importe qui accéder aux requêtes
    if (await isAdmin()) {
        const users = await User.find();
        return Response.json(users)        
    } else {
        return Response.json([]);
    }

}