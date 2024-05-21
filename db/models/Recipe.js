import mongoose from "mongoose";

const { Schema } = mongoose;

const RecipeSchema = new Schema({
  title: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  preparation: { type: String, required: true },
  usage: { type: String, required: true },
  symptoms: [{ type: String, required: true }],
  image: { type: String },
  owner: { type: String, required: true },
});

const Recipe = mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);

export default Recipe;
