import mongoose, { model, models, Schema } from "mongoose";


// Taille et Ingrédient en plus
const ExtraPriceSchema = new Schema({
    name: String,
    price: Number,
})

//Table des produits
const  ProductSchema = new Schema({
    image: { type: String },
    name: { type: String },
    description: { type: String },
    category: {type: mongoose.Types.ObjectId}, // Relation
    basePrice: { type: Number },
    sizes: {type:[ExtraPriceSchema]},
    extraIngredient: {type:[ExtraPriceSchema]},


}, { timestamps: true })

export const Product = models?.Product || model('Product',  ProductSchema )