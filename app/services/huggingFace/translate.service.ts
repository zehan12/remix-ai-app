// handler
import { HfInference } from "@huggingface/inference";

const HF_ACCESS_TOKEN = import.meta.env.VITE_HF_ACCESS_TOKEN;

const inference = new HfInference(HF_ACCESS_TOKEN);

export const translateApi = async (text: string, language: string) => {
  // Map the languages to the correct models
  const languageModels = {
    "en-es": "Helsinki-NLP/opus-mt-en-es",
    "en-de": "Helsinki-NLP/opus-mt-en-de",
    "en-fr": "Helsinki-NLP/opus-mt-en-fr",
    // Add more models as needed
  };

  const translationResponse = await inference.translation({
    model: languageModels[language], // Select the model based on the language
    inputs: text,
  });

  // Return the results
  return {
    data: translationResponse.translation_text,
  };
};
