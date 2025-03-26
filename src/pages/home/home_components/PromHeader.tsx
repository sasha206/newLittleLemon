// Import necessary dependencies
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

// Headline container styling
const HeadlineContainer = styled.div`
  position: absolute;
  z-index: 3;
  width: 100%;
  height: 100%;
  pointer-events: none; // Ensures clicks pass through to elements beneath
  
  @media (max-width: 768px) {
    position: relative;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    height: auto;
  }
`;

// Individual headline styling with props for positioning
const Headline = styled.div<{ top: string; left: string; delay: string }>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  background-color: rgba(244, 206, 20, 0.9);
  color: #333;
  padding: 8px 16px;
  border-radius: 20px;
  font-family: 'Karla', sans-serif;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.8s ease-out forwards, ${float} 3s ease-in-out infinite;
  animation-delay: ${props => props.delay};
  opacity: 0;
  
  @media (max-width: 768px) {
    position: relative;
    top: auto;
    left: auto;
    margin: 5px;
    display: inline-block;
    font-size: 12px;
    padding: 6px 12px;
  }
`;

// Headlines data with positioning information
const headlinesData = [
  { text: "24/7 Service", top: "10%", left: "5%", delay: "0s" },
  { text: "Reserve Anytime", top: "25%", left: "2%", delay: "0.2s" },
  { text: "Fresh & Tasty", top: "40%", left: "8%", delay: "0.4s" },
  { text: "Mediterranean Delight", top: "60%", left: "3%", delay: "0.6s" },
  { text: "Book Your Table", top: "5%", left: "75%", delay: "0.3s" },
  { text: "Dine with Us", top: "20%", left: "85%", delay: "0.5s" },
  { text: "Authentic Flavors", top: "35%", left: "80%", delay: "0.7s" },
  { text: "Fast & Friendly", top: "50%", left: "88%", delay: "0.9s" },
  { text: "Taste the Tradition", top: "65%", left: "78%", delay: "1.1s" },
  { text: "Your Table Awaits", top: "80%", left: "83%", delay: "1.3s" }
];

// Component to display random headlines on mobile
const MobileHeadlines = () => {
  const [visibleHeadlines, setVisibleHeadlines] = useState<string[]>([]);
  
  useEffect(() => {
    // Randomly select 4 headlines for mobile view
    const shuffled = [...headlinesData].sort(() => 0.5 - Math.random());
    setVisibleHeadlines(shuffled.slice(0, 4).map(item => item.text));
  }, []);
  
  return (
    <>
      {visibleHeadlines.map((text, index) => (
        <Headline 
          key={index} 
          top="0" 
          left="0" 
          delay={`${index * 0.2}s`}
        >
          {text}
        </Headline>
      ))}
    </>
  );
};

// Main promotional headlines component
const PromotionalHeadlines = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Clean up event listener
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  return (
    <HeadlineContainer>
      {isMobile ? (
        <MobileHeadlines />
      ) : (
        headlinesData.map((headline, index) => (
          <Headline
            key={index}
            top={headline.top}
            left={headline.left}
            delay={headline.delay}
          >
            {headline.text}
          </Headline>
        ))
      )}
    </HeadlineContainer>
  );
};

export default PromotionalHeadlines;