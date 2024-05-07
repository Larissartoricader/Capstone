import dbConnect from "@/db/connect";
import Recipe from "@/db/models/Recipe";

export default async function handler(request, response) {
  try {
    await dbConnect();
    if (request.method === "GET") {
      const recipes = await Recipe.find();
      return response.status(200).json(recipes);
    }
  } catch (error) {
    console.error("Error while Fetching", error);
    return response.status(500).json({ error: "Internal Server Error!" });
  }
}
