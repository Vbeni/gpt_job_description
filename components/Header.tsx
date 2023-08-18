// components/Header.tsx
import React, {useEffect, useState} from 'react';
export default function Header() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100); // 100ms delay
    
        return () => clearTimeout(timer); 
    }, []);
    
    return (
        <header className="header">
            <div className={`container ${isLoaded ? 'loaded' : ''}`}>
                <div className="header-inner">

                    <div className="logo">
                        <a href="#">IsThisAJob</a>
                    </div>

                    <nav className="main-nav">
                        <ul>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Portfolio</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}