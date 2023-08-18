// client side component to utilize useState 
'use client';
import { useState } from 'react';
import Forms from '../components/Forms';
import Header from '../components/Header';
import SideImage from '@/components/SideImage';

// Main Home component
export default function Home() {
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [updatedResume, setUpdatedResume] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButtonClick = async () => {
    setIsLoading(true);
    setIsButtonClicked(true);

    try {
      const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resume, jobDescription }),
      });

      const data = await response.json();
      setUpdatedResume(data.updatedResume);
      setCoverLetter(data.coverLetter);
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
                        resume={resume}
                        setResume={setResume}
                        jobDescription={jobDescription}
                        setJobDescription={setJobDescription}
                        handleButtonClick={handleButtonClick}
                        isButtonClicked={isButtonClicked}
                        isLoading={isLoading}
                        updatedResume={updatedResume}
                        coverLetter={coverLetter}
                        setUpdatedResume={setUpdatedResume}
                        setCoverLetter={setCoverLetter}
                    />
                </div>
            </div>
        </div>
    </>
  );
}
