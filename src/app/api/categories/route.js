import mongoose from 'mongoose';
import {Category} from '../../models/Category'
import { isAdmin } from '../auth/[...nextauth]/route';

// Crée une catégorie
export async function POST(req) {

    mongoose.connect(process.env.MONGO_URL)

    const { name } = await req.json(); // On grabb le nom de la catégorie passer en requête

    if (await isAdmin()) {
        const categoryDoc = await Category.create({ name }); // On crée la catégorie
        return Response.json(categoryDoc);
    } else {
        return Response.json({});
    }

   

}

// Récupérer toute les catégories
export async function GET() {

    mongoose.connect(process.env.MONGO_URL)

    const categoryDoc = await Category.find();

    return Response.json(categoryDoc);
}

// Mettre à jour une catégorie
export async function PUT(req) {

    mongoose.connect(process.env.MONGO_URL)

    const { _id, name } = await req.json();  // On grabb l'id et le nom de la catégorie passer en requête

    if (await isAdmin()) {
        await Category.updateOne({ _id }, { name });        
    }

    return Response.json(true)

}

// Supprimer une catégorie
export async function DELETE(req) {

    mongoose.connect(process.env.MONGO_URL)

    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');

    if (await isAdmin()) {
         await Category.deleteOne({_id})        
    }

    return Response.json(true);

}