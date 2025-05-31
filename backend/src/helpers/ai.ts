import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyB5BloghG5kQbhIchL_XzYLpWJdXr6b_18");

export async function AIGenerate(input: string) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20	"});

  // const prompt = `Jelaskan thread dari berikut ini: 
  // {"method":"GET","description":"The anti-clickjacking X-Frame-Options header is not present.","uri":"/","namelink":"http://192.168.44.142:80/"}
  // Jelaskan tanpa penegasan ulang kalimat, langsung dalam satu paragraf, tidak usah memakai adalah atau kata lain yang tidak perlu`;

  const result = await model.generateContent(input);
  const response = await result.response;
  const text = response.text();
  return text;
}