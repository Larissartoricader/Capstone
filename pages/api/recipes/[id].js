import dbConnect from "@/db/connect";
import Recipe from "@/db/models/Recipe";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  const session = await getServerSession(request, response, authOptions);

  if (!id) {
    response.status(404).json({ status: "Data not found" });
    return;
  }

  if (request.method === "GET") {
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      response.status(404).json({ status: "Recipe Page not found!!" });
      return;
    }

    response.status(200).json(recipe);
    return;
  }

  if (!session) {
    response.status(401).json({ error: "Access denied" });
    return;
  }

  if (request.method === "DELETE") {
    await Recipe.findByIdAndDelete(id);
    response.status(200).json({ status: "Recipe deleted!" });
    return;
  }

  if (request.method === "PUT") {
    const updatedRecipe = request.body;
    await Recipe.findByIdAndUpdate(id, updatedRecipe);
    response.status(200).json({ status: "Recipe updated!" });
    return;
  }

  response.status(405).json({ error: "Method not allowed." });
}
