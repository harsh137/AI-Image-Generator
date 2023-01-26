import { Configuration  , OpenAIApi} from "openai";

const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });
  const openai = new OpenAIApi(configuration);
  
  export default openai;