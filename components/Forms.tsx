// components/Forms.tsx
import React, { useEffect, useRef } from 'react';

type FormsProps = {
    userInput: string; // Assuming it's a string
    setUserInput: (input: string) => void;
    handleButtonClick: () => void; // Or whatever type this function takes/returns
    isButtonClicked: boolean;
    isLoading: boolean;
    promptOutput: string;
    setPromptOutput: (output: string) => void;
};

export default function Forms({
    userInput,
    setUserInput,
    handleButtonClick,
    isButtonClicked,
    isLoading,
    promptOutput,
    setPromptOutput,
}: FormsProps)  {
    const outputRef = useRef<HTMLTextAreaElement>(null);
    
    useEffect(() => {
        if (isButtonClicked && !isLoading && outputRef.current) {
            outputRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, [isLoading, isButtonClicked]);
    


    return (
      <div className="p-10 content-box">
        <textarea 
          className="border p-2 w-full mb-4" 
          placeholder="Enter your input here..." 
          value={userInput} 
          onChange={(e) => setUserInput(e.target.value)}
        />

        <div className="spinner-container">
          {isButtonClicked && isLoading && (
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          )}
        </div>

        {isButtonClicked && !isLoading && (
          <textarea 
            className="border p-2 w-full mb-4"
            ref={outputRef}
            placeholder="Prompt output will appear here..."
            value={promptOutput} 
            onChange={(e) => setPromptOutput(e.target.value)}
          />
        )}

    <button 
    className={`bg-black text-white p-2 rounded ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`} 
    onClick={handleButtonClick} 
    disabled={isLoading}
    >
    Get your prompt
    </button>

      </div>
    );
}
