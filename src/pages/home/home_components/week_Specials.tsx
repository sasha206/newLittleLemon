// src/pages/home/home_components/week_Specials.tsx
import { useState, useEffect } from "react";
import first from "/123.jpg";
import second from "/321.jpg";
import third from "/213.jpg";
import styled from "styled-components";
import { Button } from "antd";
import { MenuOutlined, ArrowRightOutlined } from '@ant-design/icons';

// Main container with improved spacing and background
const WeekSpecialsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
  background-color: #fff;
`;

// Header container with better alignment and spacing
const SpecialsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 50px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

// Title with modern styling and animation
const Title = styled.h2`
  color: #333;
  font-family: 'Markazi Text', serif;
  font-size: 42px;
  margin: 0;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: #f4ce14;
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 80px;
  }
  
  @media (max-width: 768px) {
    text-align: center;
    
    &:after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

// Button with improved styling and interactions
const MenuButton = styled(Button)`
  background-color: #f4ce14;
  border: none;
  color: black;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 24px;
  border-radius: 30px;
  height: auto;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;

  .icon {
    margin-left: 8px;
    transition: transform 0.3s ease;
  }

  &:hover {
    background-color: #e1ba00;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    
    .icon {
      transform: translateX(4px);
    }
  }
`;

// Card grid with improved spacing and responsive design
const SpecialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 40px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
`;

// Card with improved styling, animations, and interactions
const SpecialCard = styled.div`
  background-color: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  }
`;

const SpecialImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

const SpecialImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${SpecialCard}:hover & {
    transform: scale(1.05);
  }
`;

const PriceTag = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #f4ce14;
  color: black;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
`;

const SpecialContent = styled.div`
  padding: 20px;
`;

const SpecialNameRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const SpecialName = styled.h3`
  color: #333;
  font-size: 20px;
  margin: 0;
  font-family: 'Markazi Text', serif;
`;

const SpecialDescription = styled.p`
  color: #666;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const OrderButton = styled.a`
  display: inline-flex;
  align-items: center;
  color: #333;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  .icon {
    margin-left: 6px;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: #f4ce14;
    
    .icon {
      transform: translateX(4px);
    }
  }
`;

// Sample data for the specials
const specials = [
  {
    id: 1,
    name: "Greek Salad",
    price: "$12.99",
    description: "Fresh crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
    image: first // Using placeholder
  },
  {
    id: 2,
    name: "Bruschetta",
    price: "$9.99",
    description: "Grilled bread smeared with garlic and topped with diced tomatoes, fresh basil, and mozzarella. Seasoned with salt and olive oil.",
    image: second // Using placeholder
  },
  {
    id: 3,
    name: "Lemon Dessert",
    price: "$7.99",
    description: "This comes straight from grandma's recipe book. Lemon zest, light and fluffy cake topped with our homemade vanilla cream.",
    image: third // Using placeholder
  }
];

const WeekSpecials = () => {
  const [animateCards, setAnimateCards] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('specials-section');
      if (element) {
        const position = element.getBoundingClientRect();
        
        // If the element is in the viewport
        if (position.top < window.innerHeight && position.bottom >= 0) {
          setAnimateCards(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <WeekSpecialsContainer id="specials-section">
      <SpecialsHeader>
        <Title>This Week's Specials</Title>
        <MenuButton href="/menu" type="primary">
          Full Menu <MenuOutlined className="icon" />
        </MenuButton>
      </SpecialsHeader>
      
      <SpecialsGrid>
        {specials.map((special, index) => (
          <SpecialCard 
            key={special.id}
            style={{
              opacity: animateCards ? 1 : 0,
              transform: animateCards ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.5s ease ${index * 0.2}s`
            }}
          >
            <SpecialImageContainer>
              <SpecialImage src={special.image} alt={special.name} />
              <PriceTag>{special.price}</PriceTag>
            </SpecialImageContainer>
            
            <SpecialContent>
              <SpecialNameRow>
                <SpecialName>{special.name}</SpecialName>
              </SpecialNameRow>
              <SpecialDescription>{special.description}</SpecialDescription>
              <OrderButton href="/order">
                Order a delivery <ArrowRightOutlined className="icon" />
              </OrderButton>
            </SpecialContent>
          </SpecialCard>
        ))}
      </SpecialsGrid>
    </WeekSpecialsContainer>
  );
};

export default WeekSpecials;