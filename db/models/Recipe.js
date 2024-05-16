import mongoose from "mongoose";

const { Schema } = mongoose;

const RecipeSchema = new Schema({
	title: { type: String, required: true },
	ingredients: [{ type: String, required: true }],
	preparation: { type: String, required: true },
	usage: { type: String, required: true },
	symptoms: [{ type: String, required: true }],
<<<<<<< HEAD
	image: { type: String },
=======
	image: { type: String, required: false },
>>>>>>> 0182b4e (add changes)
	editable: { type: Boolean, required: false },
});

const Recipe =
	mongoose.models.initial_recipes ||
	mongoose.model("initial_recipes", RecipeSchema, "initial_recipes");

export default Recipe;