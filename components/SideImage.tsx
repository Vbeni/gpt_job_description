// components/SideImage.tsx
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export default function SideImage() {
    const [isLoaded, setIsLoaded] = useState(false);
    
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (imageRef.current?.complete) {
            setIsLoaded(true);
        }
    }, []);

    return (
        <div className={`sidebar-image ${isLoaded ? 'loaded' : ''}`}>
            <Image 
                ref={imageRef} 
                src="/images/black-n-white.png" 
                alt="Description of Image" 
                className="sidebar-image" 
                width={500} 
                height={300} 
                loading="eager"
            />
          
            <img 
                src="/images/black-n-white.png" 
                style={{ display: 'none' }} 
                onLoad={() => setIsLoaded(true)} 
            />
        </div>
    );
}
