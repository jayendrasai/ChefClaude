export async function getRecipeFromMistral(ingredientsArr) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/recipe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: ingredientsArr }),
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();
    return data.recipe || "Sorry, no recipe could be generated.";
  } catch (err) {
    console.error("❌ API error:", err.message);
    return "Error contacting recipe server.";
  }
}