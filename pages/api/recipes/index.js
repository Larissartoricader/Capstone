import dbConnect from "@/db/connect";
import Recipe from "@/db/models/Recipe";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default async function handler(request, response) {
  await dbConnect();
  const session = await getServerSession(request, response, authOptions);

  if (request.method === "GET") {
    try {
      const recipes = await Recipe.find();
      response.status(200).json(recipes);
      return;
    } catch (error) {
      response.status(500).json({ error: "Internal Server Error!" });
      return;
    }
  }

  if (!session) {
    response.status(401).json({ error: "Access denied" });
    return;
  }

  if (request.method === "POST") {
    try {
      const recipeData = request.body;
      const owner = session.user.email;
      const author = session.user.username;

      const imageUrl = await generateImage(request.body.title);

      await Recipe.create({
        ...recipeData,
        image: imageUrl,
        owner,
        author,
      });

      response.status(201).json({ status: "Recipe created." });
      return;
    } catch (error) {
      response.status(400).json({ error: error.message });
      return;
    }
  }

  response.status(405).json({ error: "Method not allowed." });
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
  }
  return replicateFinishedImage.output.at(-1);
}
