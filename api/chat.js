import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function (req, res) {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  const { message } = req.body;

  if (!apiKey) {
    return res.status(500).send("Gemini API-nøgle mangler.");
  }
  if (!message) {
    return res.status(400).send("Beskedtekst mangler.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const chat = model.startChat({
      history: [], // Vi starter en ny chat hver gang for enkelhedens skyld
      generationConfig: {
        maxOutputTokens: 200,
      },
    });

    const result = await chat.sendMessage(message);
    const responseText = await result.response.text();

    res.status(200).json({ text: responseText });
  } catch (error) {
    console.error("Gemini API Fejl:", error);
    res.status(500).json({ error: "Fejl ved kommunikation med Gemini API." });
  }
}
