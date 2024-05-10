import dbConnect from "@/db/connect";
import Recipe from "@/db/models/Recipe";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

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

  if (request.method === "DELETE") {
    await Recipe.findByIdAndDelete(id);
    response.status(200).json({ status: "Recipe deleted!" });
    return;
  }
}
