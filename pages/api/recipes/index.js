import dbConnect from "@/db/connect";
import Recipe from "@/db/models/Recipe";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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

  if (request.method === "POST") {
    await dbConnect();
    try {
      const recipeData = request.body;
      if (!recipeData.hasOwnProperty("editable")) {
        recipeData.editable = true;
      }
      const imageUrl = await generateImage(request.body.title);
      recipeData.image = imageUrl;
      await Recipe.create(recipeData);

      response.status(201).json({ status: "Recipe created." });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}

async function generateImage(prompt) {
  const apiResponse = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Pinned to a specific version of Stable Diffusion
      // See https://replicate.com/stability-ai/sdxl
      version:
        "ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",

      // This is the text prompt that will be submitted by a form on the frontend
      input: { prompt },
    }),
  });
  console.log("starting fetching");

  const replicateStatus = await apiResponse.json();

  let replicateFinishedImage = { status: "starting" };
  while (
    replicateFinishedImage.status !== "succeeded" &&
    replicateFinishedImage.status !== "failed"
  ) {
    await sleep(1000);
    const imageResponse = await fetch(replicateStatus.urls.get, {
      headers: {
        Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    replicateFinishedImage = await imageResponse.json();
    console.log(replicateFinishedImage);
  }

  console.log(replicateFinishedImage.output.at(-1));

  return replicateFinishedImage.output.at(-1);
}
