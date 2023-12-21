import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { UserInfo } from '../../models/UserInfo'
import {Order} from '../../models/Order'

// Récupérer les commandes
export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL);

    const session = await getServerSession(authOptions);

    //Grabb l'email de l'utilisateur via la session
    const userEmail = session?.user?.email;

    let isAdmin = false;

    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');

    if (_id) {
        return Response.json(await Order.findById(_id))
    }

    if (userEmail) {

        const userInfo = await UserInfo.findOne({ email: userEmail });

        if (userInfo) {
            //Savoir si l'utilisateur est admin
            isAdmin = userInfo.admin;
        }

    }

    //Si on est admin on récupéres toutes les commandes
    if (isAdmin) {
        return Response.json(await Order.find())
    }

    // Si c'est un utilisateur normal, on récupere ses commandes propre à lui
    if (userEmail) {
        return Response.json(await Order.find({userEmail}))
    }

}