import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { InferenceClient } from "@huggingface/inference";

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize HF client
const hfApiKey = process.env.HF_API_KEY;
if (!hfApiKey) {
  console.error("❌ Missing HF_API_KEY in .env file");
  process.exit(1);
}
const hf = new InferenceClient(hfApiKey);

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients and suggests a recipe.
Format your response in markdown.
`;

app.post("/api/recipe", async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: "Invalid ingredients list" });
  }

  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${ingredients.join(", ")}. Please suggest a recipe!`,
        },
      ],
      max_tokens: 512,
    });

    // Safe extraction
    const recipeText =
      response.choices?.[0]?.message?.content ||
      response.choices?.[0]?.delta?.content ||
      "No recipe generated.";

    res.json({ recipe: recipeText });
  } catch (err) {
    console.error("❌ Hugging Face error:", err.message);
    res.status(500).json({ error: "Failed to generate recipe" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Backend running at http://localhost:${PORT}`)
);