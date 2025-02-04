import styled from "styled-components";
import { Button } from "antd";

const WeekSpecialsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: #fff;
`;

const Title = styled.h2`
  color: #333;
  font-family: 'Markazi Text', serif;
  font-size: 42px;
  margin-bottom: 30px;
  text-align: center;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: #f4ce14;
  }
`;

const SpecialsGrid = styled.div`
  margin-bottom: 10px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const SpecialCard = styled.div`
  background-color: white;
  border-radius: 16px;
  width: 280px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const SpecialImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 15px;
`;

const SpecialName = styled.h3`
  color: #333;
  font-size: 18px;
  margin: 10px 0 5px;
`;

const SpecialDescription = styled.p`
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
`;

const MenuButton = styled(Button)`
  margin: 3px;
  background-color: #f4ce14;
  border: none;
  color: black;
  font-size: 16px;
  text-decoration: none;
  border-radius: 8px;

  @media (max-width: 768px) {
    margin-top: 50px;
    margin-bottom: 50px;
    font-size: 28px; /* Увеличиваем размер шрифта на мобильных */
    padding: 24px 36px; /* Увеличиваем отступы для кнопки */
    border-radius: 40px;
  }

  &:hover {
    background-color: #bbbbbb;
  }
`;

const WeekSpecials = () => {
  return (
    <WeekSpecialsContainer>
      <Title>Specials of the Week</Title>
      <SpecialsGrid>
        <SpecialCard>
          <SpecialImage src="dish1.jpg" alt="Dish 1" />
          <SpecialName>Spaghetti Carbonara</SpecialName>
          <SpecialDescription>A classic Italian pasta with a creamy sauce.</SpecialDescription>
        </SpecialCard>
        <SpecialCard>
          <SpecialImage src="dish2.jpg" alt="Dish 2" />
          <SpecialName>Margherita Pizza</SpecialName>
          <SpecialDescription>Traditional pizza with fresh mozzarella and basil.</SpecialDescription>
        </SpecialCard>
        <SpecialCard>
          <SpecialImage src="dish3.jpg" alt="Dish 3" />
          <SpecialName>Greek Salad</SpecialName>
          <SpecialDescription>Fresh salad with feta cheese, olives, and tomatoes.</SpecialDescription>
        </SpecialCard>
      </SpecialsGrid>
      <MenuButton href="/menu">View Full Menu</MenuButton>
    </WeekSpecialsContainer>
  );
};

export default WeekSpecials;