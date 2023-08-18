import React, { useEffect, useRef } from 'react';

type FormsProps = {
    resume: string;
    setResume: (input: string) => void;
    jobDescription: string;
    setJobDescription: (input: string) => void;
    handleButtonClick: () => void;
    isButtonClicked: boolean;
    isLoading: boolean;
    updatedResume: string;
    coverLetter: string;
    setUpdatedResume: (output: string) => void;
    setCoverLetter: (output: string) => void;
};

export default function Forms({
    resume,
    setResume,
    jobDescription,
    setJobDescription,
    handleButtonClick,
    isButtonClicked,
    isLoading,
    updatedResume,
    coverLetter,
    setUpdatedResume,
    setCoverLetter,
}: FormsProps)  {
    const resumeRef = useRef<HTMLTextAreaElement>(null);
    const coverLetterRef = useRef<HTMLTextAreaElement>(null);
    
    useEffect(() => {
        if (isButtonClicked && !isLoading) {
            if (resumeRef.current) {
                resumeRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
            if (coverLetterRef.current) {
                coverLetterRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    }, [isLoading, isButtonClicked]);

    return (
      <div className="p-10 content-box">
        <textarea 
          className="border p-2 w-full mb-4" 
          placeholder="Paste your resume here..." 
          value={resume} 
          onChange={(e) => setResume(e.target.value)}
        />

        <textarea 
          className="border p-2 w-full mb-4" 
          placeholder="Paste the job description here..." 
          value={jobDescription} 
          onChange={(e) => setJobDescription(e.target.value)}
        />

        <div className="spinner-container">
          {isButtonClicked && isLoading && (
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          )}
        </div>

        {isButtonClicked && !isLoading && (
          <>
            <textarea 
                className="border p-2 w-full mb-4"
                ref={resumeRef}
                placeholder="Updated resume will appear here..."
                value={updatedResume} 
                onChange={(e) => setUpdatedResume(e.target.value)}
            />

            <textarea 
                className="border p-2 w-full mb-4"
                ref={coverLetterRef}
                placeholder="Cover letter will appear here..."
                value={coverLetter} 
                onChange={(e) => setCoverLetter(e.target.value)}
            />
          </>
        )}

        <button 
            className={`bg-black text-white p-2 rounded ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`} 
            onClick={handleButtonClick} 
            disabled={isLoading}
        >
        Generate Updates
        </button>
      </div>
    );
}
