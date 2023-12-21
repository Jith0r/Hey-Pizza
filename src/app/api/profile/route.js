import mongoose from "mongoose";
import { User } from "@/app/models/User";
import {UserInfo} from '@/app/models/UserInfo'
import { getServerSession } from "next-auth"
import {authOptions} from '../../api/auth/[...nextauth]/route'

// Fonction pour mettre à jour un profil utilisateur
export async function PUT(req) {
    //Connexion à la DB
    mongoose.connect(process.env.MONGO_URL);

    //On grabb les data utilisateur
    const data = await req.json();
    const { _id, name, image, ...otherUserInfo } = data;

    let filter = {};

    if (_id) {
        filter = { _id };
    } else {

        // Mettre à jour son profile
        // On récupere les information de sessions via getServerSession avec authOptions
        const session = await getServerSession(authOptions);

        // On grabb l'email via la session
        const email = session.user.email;

        filter = { email };
    }

        const user = await User.findOne(filter)
        await User.updateOne(filter, { name, image });
        await UserInfo.findOneAndUpdate({ email:user.email}, otherUserInfo, {upsert:true} );

    return Response.json(true);
}


// Fonction pour récupérer les information utilisateur
export async function GET(req) {
    //Connexion à la DB
    mongoose.connect(process.env.MONGO_URL);

    const url = new URL(req.url);

    const _id = url.searchParams.get('_id');

    // Pour un profil utilisateur avec son id
    if (_id) {
        const user = await User.findOne({ _id }).lean()
        const userInfo = await UserInfo.findOne({ email: user.email }).lean()
        
        return Response.json({ ...user, ...userInfo });
        
    } else {
        // Pour son profil à soi-même
        // On récupere les information de sessions via getServerSession avec authOptions
        const session = await getServerSession(authOptions);

        // On grabb l'email via la session
        const email = session?.user?.email;

        if (!email) {
            return Response.json({});
        }

        const user = await User.findOne({ email }).lean()
        const userInfo = await UserInfo.findOne({email}).lean()

        return Response.json({ ...user, ...userInfo });
    }



}