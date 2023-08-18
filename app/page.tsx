//client side component to utilize useState 
'use client';
import { useState } from 'react';
import Forms from '../components/Forms'
import Header from '../components/Header'
import SideImage from '@/components/SideImage';

// Main Home component
export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [promptOutput, setPromptOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButtonClick = async () => {
    setIsLoading(true);
    setIsButtonClicked(true);

    try {
      const messages = [
        { "role": "system", "content": "You are an expert AI prompt generator." },
        { "role": "user", "content": `INPUT: ${userInput} PROMPT OUTPUT:` }
      ];
  
      const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });
  
      const data = await response.json();
      setPromptOutput(data.data);
    } catch (error) {
      console.error('Error fetching prompt:', error);
    }

    setIsLoading(false);
  };

  return (
    <>
        <Header />
        <div className="component-container">
            <SideImage />
            <div className="content-box">
            <div className="scrollable-content">

            <Forms 
                userInput={userInput} 
                setUserInput={setUserInput}
                handleButtonClick={handleButtonClick}
                isButtonClicked={isButtonClicked}
                isLoading={isLoading}
                promptOutput={promptOutput}
                setPromptOutput={setPromptOutput}
            />
        </div>
        </div>
        </div>
    </>
);
}
