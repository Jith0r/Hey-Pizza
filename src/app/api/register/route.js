import mongoose from "mongoose"
import { User } from "../../models/User"
import bcrypt from 'bcrypt'

// On envoi une requête POST pour inscrire un utilisateur à la DB
export async function POST(req) {

    //On grabb les information du body
    const body = await req.json()

    mongoose.connect(process.env.MONGO_URL); // Connexion à la db

    //On grabb le mot de passe
    const pass = body.password;

    // Si on a pas de mot de passe ou qu'il est plus petit que 5 caractère
    if (!pass?.length || pass.length < 5) {
                new Error('Le mot de passe doit avoir au minimum 5 charactères');
    }
    
    //Hasher le mot de passe
    const notHashedPassword = pass; // on grabb le mot de passe non hasher
    const salt = bcrypt.genSaltSync(10); // On crée un salt
    const hashedPassword = bcrypt.hashSync(notHashedPassword, salt); // On hash le mot de passe avec le salt

    body.password = hashedPassword; // On attribut le mot de passe hasher au body

    const createdUser = await User.create(body); // On passe ces information à la création de l'utilisateur

    return Response.json(createdUser);
}