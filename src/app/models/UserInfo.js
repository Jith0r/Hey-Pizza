import { model, models, Schema } from "mongoose";

//Table des informations utilisateurs
const UserInfoSchema = new Schema({
    email: { type: String, required: true },
    phone: { type: String },
    streetAddress: { type: String },
    postalCode: { type: String },
    city: { type: String },
    admin: { type: Boolean, default: false },
}, { timestamps: true });

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema)