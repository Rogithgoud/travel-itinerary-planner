const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));



const generateItinerary = async ({
  destination,
  startDate,
  endDate,
  preferences,
}) => {
  const prompt = `
    You are a travel planning assistant.

Generate a day-wise travel itinerary based on the following inputs:
Destination: ${destination}
Start date: ${startDate}
End date: ${endDate}
Preferences: ${preferences}

For each day, include:
- Day number
- Morning activity (attraction name and brief description)
- Afternoon activity (attraction name and brief description)
- Evening activity (attraction name and brief description)
- Approximate location names for each activity
- Simple travel route suggestions between activities

Constraints:
- Keep suggestions realistic and geographically reasonable
- Do not include pricing or booking links
- Do not include emojis or markdown

Output strictly in valid JSON using this structure:

{
  "destination": "",
  "totalDays": number,
  "days": [
    {
      "day": number,
      "morning": { "activity": "", "location": "" },
      "afternoon": { "activity": "", "location": "" },
      "evening": { "activity": "", "location": "" },
      "routeNotes": ""
    }
  ]
}
`;

  const MODEL_NAME = "gemini-2.0-flash";
  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    throw new Error("GEMINI_API_KEY is missing in environment variables");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data);
      throw new Error(data?.error?.message || "Gemini API request failed");
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("Empty response from Gemini model");
    }

    // Clean JSON (handles ```json ... ``` or extra text)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return jsonMatch ? jsonMatch[0] : text;

  } catch (error) {
    console.error("Gemini Service Error:", error.message);
    throw error;
  }
};

module.exports = { generateItinerary };
