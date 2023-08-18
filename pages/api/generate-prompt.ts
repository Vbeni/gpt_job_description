import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const generatePrompt = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }
  
    try {
        const { resume, jobDescription } = req.body;
        if (!resume || !jobDescription) {
            return res.status(400).json({ error: 'Both resume and job description are required' });
        }

        const openaiResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions',  
            {
                model: "gpt-3.5-turbo", 
                messages: [
                    { role: "system", content: "You are a world class resume editor who specializes in ATS keywords" },
                    { role: "user", content: `Your task is to take the user's constant resume as INPUT1: ${resume}. And take in a job description as INPUT2: ${jobDescription}. Scan it for ATS keywords, then OUTPUT1 a new resume that maintains original styling and incorporates as many keywords as reasonably possible and then OUTPUT2 an updated cover letter to match the new resume and job description.` }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        const responseContent = openaiResponse.data.choices[0].message.content.trim();
        const updatedResume = responseContent.split("OUTPUT1")[1].split("OUTPUT2")[0].trim();
        const coverLetter = responseContent.split("OUTPUT2")[1].trim();

        return res.status(200).json({ updatedResume, coverLetter });

    } catch (error) {
        console.error('Error calling OpenAI:', (error as any).response?.data || (error as any).message);
        return res.status(500).json({ error: 'Failed to generate prompt' });
    }  
};

export default generatePrompt;
