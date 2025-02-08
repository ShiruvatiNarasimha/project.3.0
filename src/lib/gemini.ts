import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const summariseCommit = async (diff: string) => {
  // https://github.com/docker/genai-stack/commit/<commithash>.diff
  const response = await model.generateContent([
    "You are an expert programmer, and you are trying to summarize a git diff. Reminders about the git diff format: For every file, there are a few metadata lines, like (for example):     ",
  ]);
};
