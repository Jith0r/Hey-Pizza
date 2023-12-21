import mongoose from "mongoose";
import NextAuth, { getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { User } from '../../../models/User';
import bcrypt from 'bcrypt';
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from '../../../../libs/mongoConnect'
import { UserInfo } from "@/app/models/UserInfo";

export const authOptions = {
    secret: process.env.SECRET,
    adapter: MongoDBAdapter(clientPromise), // Pour crée une session dans la DB via un compte google
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
        name: 'Credentials',
        id: 'credentials',
        credentials: {
        username: { label: "Adresse e-mail", type: "email", placeholder: "test@exemple.fr" },
        password: { label: "Mot de passe", type: "password" }
        },
        async authorize(credentials, req) {

            //On grabb l'email et le mot de passe passer en credentials
            const email = credentials?.email;
            const password = credentials?.password;


            // On se connecte à la DB
            mongoose.connect(process.env.MONGO_URL);
            // On cherche un utilisateur qui a cet email
            const user = await User.findOne({ email })

            //Comparer si il y a un utilisateur && les mot de passe sont ok (celui entrer et celui dans la base de donné)
            const userOk = user && bcrypt.compareSync(password, user.password);

            //Si l'utilisateur est ok alors on retourne l'uitlisateur
            if (userOk) {
                return user; 
            }
        // Return null if user data could not be retrieved
        return null
        }
    })
    ],
    session: {
    strategy: 'jwt', // Pour crée une session pour utilisateur avec email
  },
}

//Fonction pour éviter d'envoyer des requêtes et avoir les réponse d'api si on est pas admin
export async function isAdmin() {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
        return false;
    }

    // Si on a un compte connecter on veut savoir si il est admin
    const userInfo = await UserInfo.findOne({ email: userEmail });

    if (!userInfo) {
        return false;
    }

    return userInfo.admin;

}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }