import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY, dangerouslyAllowBrowser: true  });

export async function main(ingredients) {
  const chatCompletion = await getGroqChatCompletion(ingredients);
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
  return chatCompletion.choices[0]?.message?.content || "";
}

export async function getGroqChatCompletion(ingredients) {
  return groq.chat.completions.create({
    messages: [
        {
            role: "system",
            content: "You are a helpful assistant that generates recipes based on given ingredients."
        },
      {
        role: "user",
        content: `Generate a recipe using the following ingredients: ${ingredients.join(",")}. Please provide the recipe name, ingredient list, and step-by-step instructions.`,
      },
    ],
    model: "llama3-8b-8192",
  });
}