import mongoose from "mongoose";
import { Product } from "../../models/Product";
import { isAdmin } from "../auth/[...nextauth]/route";


// Ajouter un produit
export async function POST(req) {

    mongoose.connect(process.env.MONGO_URL)

    const data = await req.json(); // On grabb les data passer par le formulaire front

    if (await isAdmin()) {
        const productDoc = await Product.create(data); // On stock les data dans la table MenuItem 
        return Response.json(productDoc);
    } else {
        return Response.json({})
    }
}

// Mettre à jour un produit
export async function PUT(req) {

    mongoose.connect(process.env.MONGO_URL)

    if (await isAdmin()) {
         const {_id, ...data} = await req.json(); // On grabb l'id et le reste des data (name, description, prix etc)

        await Product.findByIdAndUpdate(_id, data); // On trouve le produit via son id et on modifie les data     
    }

    return Response.json(true);
}



// Récupérer les produits
export async function GET() {
    mongoose.connect(process.env.MONGO_URL)
    
    const allProduct = await Product.find() // On récupere tous les produits dans la DB
    return Response.json(allProduct)    
    
    
}


// Supprimer un produit
export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URL)

    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');

    if (await isAdmin()) {
        
        await Product.deleteOne({ _id })   
    }

    return Response.json(true);

}