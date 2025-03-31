import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { ReadOutlined } from '@ant-design/icons';
import first from "/story.jpg";
// Main container with attractive background
const StoryContainer = styled.section`
  background-color: #f8f8f8;
  padding: 80px 20px;
`;

// Inner content container with proper spacing
const StoryContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 50px;
  
  @media (max-width: 992px) {
    flex-direction: column;
    gap: 40px;
  }
`;

// Image container with animation and effects
const StoryImageContainer = styled.div`
  flex: 1;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: -15px;
    left: -15px;
    width: 100%;
    height: 100%;
    border: 3px solid #f4ce14;
    z-index: 1;
  }
  
  @media (max-width: 992px) {
    width: 100%;
    max-width: 500px;
  }
`;

const StoryImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  position: relative;
  z-index: 2;
`;

// Text container with responsive design
const StoryTextContainer = styled.div`
  flex: 1;
  
  @media (max-width: 992px) {
    text-align: center;
  }
`;

// Title with modern styling
const Title = styled.h2`
  color: #333;
  font-family: 'Markazi Text', serif;
  font-size: 42px;
  margin: 0 0 15px 0;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: #f4ce14;
    
    @media (max-width: 992px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const Subtitle = styled.h3`
  color: #666;
  font-family: 'Markazi Text', serif;
  font-size: 24px;
  margin: 20px 0 15px 0;
`;

const Paragraph = styled.p`
  color: #333;
  font-family: 'Karla', sans-serif;
  font-size: 16px;
  line-height: 1.7;
  margin-bottom: 20px;
`;

// Button with improved styling
const StoryButton = styled(Button)`
  background-color: transparent;
  border: 2px solid #f4ce14;
  color: #333;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 24px;
  border-radius: 30px;
  height: auto;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
  margin-top: 10px;

  .icon {
    margin-right: 8px;
    transition: transform 0.3s ease;
  }

  &:hover {
    background-color: #f4ce14;
    color: #333;
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    
    .icon {
      transform: scale(1.1);
    }
  }
  
  @media (max-width: 992px) {
    margin: 0 auto;
    display: inline-flex;
  }
`;

// Highlight box for key facts
const HighlightBox = styled.div`
  background-color: white;
  border-left: 4px solid #f4ce14;
  padding: 15px 20px;
  margin: 25px 0;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
`;

const HighlightText = styled.p`
  color: #333;
  font-family: 'Karla', sans-serif;
  font-size: 16px;
  font-style: italic;
  line-height: 1.6;
  margin: 0;
`;

const OurStory = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('story-section');
      if (element) {
        const position = element.getBoundingClientRect();
        
        // If the element is in the viewport
        if (position.top < window.innerHeight && position.bottom >= 0) {
          setIsAnimated(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <StoryContainer id="story-section">
      <StoryContent>
        <StoryImageContainer
          style={{
            opacity: isAnimated ? 1 : 0,
            transform: isAnimated ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 0.8s ease'
          }}
        >
          <StoryImage 
            src={first}
            alt="Little Lemon founders in the restaurant kitchen" 
          />
        </StoryImageContainer>
        
        <StoryTextContainer
          style={{
            opacity: isAnimated ? 1 : 0,
            transform: isAnimated ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.8s ease 0.2s'
          }}
        >
          <Title>Our Story</Title>
          <Subtitle>A Mediterranean Tradition Since 2010</Subtitle>
          
          <Paragraph>
            Little Lemon began with two brothers, Mario and Adrian, who transformed their 
            grandmother's collection of traditional Mediterranean recipes into a cozy corner 
            restaurant in the heart of Chicago.
          </Paragraph>
          
          <HighlightBox>
            <HighlightText>
              "We don't just make food; we craft experiences that transport you to the 
              Mediterranean coast with every bite."
            </HighlightText>
          </HighlightBox>
          
          <Paragraph>
            What started as a small family kitchen quickly became a neighborhood favorite. 
            Our commitment to using only the freshest, locally-sourced ingredients and authentic 
            Mediterranean cooking techniques has earned us recognition throughout Chicago.
          </Paragraph>
          
          <Paragraph>
            Today, Little Lemon continues to blend tradition with innovation, serving up 
            classic Mediterranean dishes with a modern twist in a warm, welcoming atmosphere 
            that makes everyone feel like family.
          </Paragraph>
          
          <StoryButton href="/about">
            <ReadOutlined className="icon" /> Read Full Story
          </StoryButton>
        </StoryTextContainer>
      </StoryContent>
    </StoryContainer>
  );
};

export default OurStory;