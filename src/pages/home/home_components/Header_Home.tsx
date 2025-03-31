import HeaderImg from "../home_components/restauranfood.jpg";
// src/pages/home/home_components/Header_Home.tsx
import { useEffect } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { ArrowRightOutlined } from '@ant-design/icons';


// Main container styling with gradient overlay and proper spacing
const HomeStyled = styled.div`
  background-color: rgb(73, 94, 87);
  position: relative;
  overflow: hidden;
  padding-top: 100px; // Space for the fixed navbar
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%);
    z-index: 1;
  }
`;

// Header layout container with responsive design
const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;
  padding: 80px 40px;
  position: relative;
  z-index: 2;

  @media (max-width: 992px) {
    padding: 60px 30px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 40px 20px;
    text-align: center;
  }
`;

// Article content container with responsive width
const ArticleHeader = styled.article`
  max-width: 45%;
  animation: fadeInLeft 1s ease-out;

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 768px) {
    max-width: 90%;
    margin-bottom: 30px;
    animation: fadeInUp 1s ease-out;

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;

// Main title styling with responsive adjustments
const Title = styled.h1`
  color: #f4ce14;
  font-family: 'Markazi Text', serif;
  font-weight: 700;
  font-size: 4rem;
  margin: 0;
  line-height: 1.1;
  letter-spacing: -0.5px;

  @media (max-width: 992px) {
    font-size: 3.5rem;
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

// Subtitle styling with responsive design
const Subtitle = styled.h2`
  color: white;
  font-family: 'Markazi Text', serif;
  font-weight: 500;
  font-size: 2rem;
  margin: 0 0 20px 0;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

// Paragraph text styling with responsive adjustments
const Paragraph = styled.p`
  color: white;
  font-family: 'Karla', sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0 0 30px 0;
  line-height: 1.5;
  max-width: 90%;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    max-width: 100%;
  }
`;

// Custom styled button component with hover effects and responsive design
const CustomButton = styled(Button)`
  background-color: #f4ce14;
  border: none;
  color: black;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 12px 30px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  height: auto;

  .icon {
    margin-left: 8px;
    transition: transform 0.3s ease;
  }

  &:hover {
    background-color: #fff;
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0,0,0,0.2);
    
    .icon {
      transform: translateX(5px);
    }
  }
  
  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

// Header image styling with responsive adjustments and visual effects
const ImageContainer = styled.div`
  width: 45%;
  position: relative;
  z-index: 2;
  animation: fadeInRight 1s ease-out;
  
  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 768px) {
    width: 80%;
    margin-top: 20px;
    animation: fadeInUp 1s ease-out 0.3s both;
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;

const ImgHeader = styled.img`
  width: 100%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0,0,0,0.3);
  transition: transform 0.5s ease;
  
  &:hover {
    transform: scale(1.03);
  }
`;

// Main header component
const Header = () => {

  
  useEffect(() => {
    // Trigger animation after component mounts

  }, []);

  return (
    <HomeStyled>
      <HeaderStyled>
        <ArticleHeader>
          <Title>Little Lemon</Title>
          <Subtitle>Chicago</Subtitle>
          <Paragraph>
            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
          </Paragraph>
          <CustomButton href="/reservations" type="primary">
            Reserve a Table <ArrowRightOutlined className="icon" />
          </CustomButton>
        </ArticleHeader>
        <ImageContainer>
          <ImgHeader src={HeaderImg} alt="Delicious food from Little Lemon restaurant" />
        </ImageContainer>
      </HeaderStyled>
    </HomeStyled>
  );
};

export default Header;