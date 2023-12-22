import express from 'express';
import mongoose from 'mongoose';
import { RecipeModel } from "../models/Recipes";

const router = express.Router();

export { router as recipesRouter };