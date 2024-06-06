import './Layout.css';
import React, { useEffect, useRef } from 'react';
import Header from '../Header/Header';

const Layout = ({ children }) => {
  const appRef = useRef(null);

  useEffect(() => {
    const moveGradient = (event) => {
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;

      // Calculate the cursor position as a percentage
      const mouseX = (event.pageX / winWidth) * 100;
      const mouseY = (event.pageY / winHeight) * 100;

      if (appRef.current) {
        appRef.current.style.setProperty('--mouse-x', `${mouseX}%`);
        appRef.current.style.setProperty('--mouse-y', `${mouseY}%`);
      }
    };

    document.addEventListener('mousemove', moveGradient);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousemove', moveGradient);
    };
  }, []);

  return (
    <div className="Layout-container" ref={appRef}>
      <Header />
      <div className="Layout-content">{children}</div>
    </div>
  );
};

export default Layout;
