import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    savedRecipes: []
});

export const UserModel = mongoose.model("user", UserSchema);