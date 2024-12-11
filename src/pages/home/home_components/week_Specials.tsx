import styled from "styled-components";
import { Button } from "antd";

const WeekSpecialsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f8f8;
`;

const Title = styled.h2`
  color: #333;
  font-family: 'Markazi Text', serif;
  font-size: 36px;
  margin-bottom: 20px;
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
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 250px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const SpecialImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
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
    padding: 36px 48px; /* Увеличиваем отступы для кнопки */
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