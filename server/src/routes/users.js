import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router = express.Router();

import { UserModel } from "../models/Users.js"


router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (user) {
        return res.json({message: "User already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel ({username, password: hashedPassword, recipes: []})

    await newUser.save();

    res.json({message: "User Registered Successfully"});
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user) {
        return res.json({message: "User doesn't exist"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid){
        return res.json({message: "Username or Password is Incorrect"})
    }

    const token = jwt.sign({id: user.id}, "secret")
    console.log("Logging in user:", user.username); 
    res.json({ token, userID: user._id, username: user.username});
})

router.post('/saveRecipe', async (req, res) => {
    const { userID, recipeData } = req.body;
    
    try {
        // Find the user by ID and update their savedRecipes array
        await UserModel.findByIdAndUpdate(userID, {
            $addToSet: { savedRecipes: recipeData } // $addToSet prevents duplicates
        });

        res.status(200).send('Recipe saved successfully');
    } catch (error) {
        console.error('Error saving recipe:', error);
        res.status(500).send('Error saving recipe');
    }
});

router.get('/savedRecipes', async (req, res) => {
    const { userID } = req.query; // Using query parameters for GET requests

    try {
        // Assuming you have a user model with a savedRecipes field
        const user = await UserModel.findById(userID).populate('savedRecipes');
        if (user && user.savedRecipes) {
            res.json({ savedRecipes: user.savedRecipes });
        } else {
            res.status(404).send('No saved recipes found for this user');
        }
    } catch (error) {
        console.error('Error fetching saved recipes:', error);
        res.status(500).send('Error fetching saved recipes');
    }
});

router.post('/unsaveRecipe', async (req, res) => {
    const { userID, recipeData } = req.body;

    try {
        // Find the user by ID and remove the recipe from their savedRecipes array
        await UserModel.findByIdAndUpdate(userID, {
            $pull: { savedRecipes: recipeData } // $pull removes the item from the array
        });

        res.status(200).send('Recipe unsaved successfully');
    } catch (error) {
        console.error('Error unsaving recipe:', error);
        res.status(500).send('Error unsaving recipe');
    }
});

// router.get('/isRecipeSaved', async (req, res) => {
//     const { userID, recipeData } = req.body;

//     try {
//         const user = await UserModel.findById(userID).populate('savedRecipes');
//         const isSaved = user.savedRecipes.some(savedRecipe => savedRecipe.equals(recipeData)); // Assuming _id is the identifier

//         res.status(200).json({ isSaved: isSaved });
//     } catch (error) {
//         console.error('Error checking saved recipe:', error);
//         res.status(500).send('Error checking saved recipe');
//     }
// });

export { router as userRouter };