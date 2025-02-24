// Import necessary dependencies and assets
import styled from "styled-components";
import HeaderImg from "../home_components/restauranfood.jpg";
import { Button } from "antd";

// Custom styled button component with hover effects and responsive design
const CustomButton = styled(Button)`
  background-color: #f4ce14;
  border: none;
  color: black;
  font-size: 18px;
  padding: 12px 30px;
  border-radius: 30px;
  margin-top: 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }
  
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px 25px;
  }
`;

// Main title styling with responsive adjustments
const Title = styled.h1`
  color: #f4ce14;
  font-family: 'Markazi Text', serif;
  font-weight: 500;
  font-size: 32pt;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 20pt;
    text-align: center;
  }
`;

// Subtitle styling with responsive design
const Subtitle = styled.h1`
  color: white;
  font-family: 'Markazi Text', serif;
  font-weight: 500;
  font-size: 24pt;
  margin: 0;
  padding-bottom: 0px;

  @media (max-width: 768px) {
    font-size: 14pt;
    text-align: center;
  }
`;

// Paragraph text styling with responsive adjustments
const Paragraph = styled.p`
  color: white;
  font-family: 'Karla', sans-serif;
  font-size: 14pt;
  font-weight: 400;
  margin: 10px 0; 

  @media (max-width: 768px) {
    font-size: 14pt;
    text-align: center;
    padding: 0 10px;
  }
`;

// Main container styling with gradient overlay
const HomeStyled = styled.div`
  background-color: rgb(73, 94, 87);
  margin-bottom: 1vh;
  position: relative;
  overflow: visible; 
  z-index: 1;  

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%);
    z-index: 1;
  }
`;

// Background header container with responsive adjustments
const BackgroundHeaderStyled = styled.header`

  @media (max-width: 768px) {
    height: auto;
    padding: 20px 0;
  }
`;

// Header layout container with responsive design
const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;
  padding: 30px 20px;  // Reduced from 60px
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;  // Reduced from 30px
  }
`;

// Article content container with responsive width
const ArticleHeader = styled.article`
  max-width: 30%;  // Increased from 20% for better readability

  h1 {
    font-family: 'Markazi Text', serif;
    font-weight: 500;
    font-size: 32pt;  // Reduced from 40pt
    margin: 0;
  }

  h2 {
    font-family: 'Markazi Text', serif;
    font-weight: 500;
    font-size: 16pt;  // Reduced from 18pt
    margin: 0;
  }

  @media (max-width: 768px) {
    max-width: 90%;
    text-align: center;
  }
`;

// Header image styling with responsive adjustments and visual effects
const ImgHeader = styled.img`
  width: 100%;
  max-width: 25%;  // Reduced from 30%
  height: auto;
  border-radius: 10px;
  position: relative;
  z-index: 2;  // Higher than HomeStyled
  transform: translateY(100px);  // Reduced from 150px
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);  // Add shadow for better visual effect

  @media (max-width: 768px) {
    max-width: 70%;  // Reduced from 80%
    margin-top: 15px;  // Reduced from 20px
    transform: translateY(0);  // Reset transform on mobile
    z-index: 1;  // Reset z-index on mobile
  }
`;

// Main header component
const Header = () => {
  return (
    <HomeStyled>
      <BackgroundHeaderStyled>
        <HeaderStyled>
          <ArticleHeader>
            <Title>Little Lemon</Title>
            <Subtitle>Chicago</Subtitle>
            <Paragraph>
              We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
            </Paragraph>
            <CustomButton href="/reservations">Reserve a Table</CustomButton>
          </ArticleHeader>
          <ImgHeader src={HeaderImg} />
        </HeaderStyled>
      </BackgroundHeaderStyled>
    </HomeStyled>
  );
};

export default Header;