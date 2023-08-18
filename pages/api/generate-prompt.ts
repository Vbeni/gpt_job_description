import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const generatePrompt = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }
  
    const { messages } = req.body;
    if (!messages) {
      return res.status(400).json({ error: 'Messages are required' });
    }
  
    try {
      const openaiResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',  
        {
            model: "gpt-3.5-turbo", 
            messages: [
                { role: "system", content: "You are an expert AI prompt generator Who excels at clear, detailed, succinct expository writing." },
                { role: "user", content: `Your task is to take a user's ideas for prompts as INPUTS, and then OUTPUT a clearly defined prompt that will create an AI assistant to fit their needs. INPUT: ${messages[1].content.split(":")[1].trim()} PROMPT OUTPUT: ` }
            ]
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          }
        }
      );
  
      return res.status(200).json({ data: openaiResponse.data.choices[0].message.content.trim() });
  
    } catch (error) {
        console.error('Error calling OpenAI:', (error as any).response?.data || (error as any).message);
        return res.status(500).json({ error: 'Failed to generate prompt' });
    }
    
};

export default generatePrompt;