import styled from "styled-components";
import HeaderImg from "../home_components/restauranfood.jpg";
import { Button } from "antd";

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

const Title = styled.h1`
  color: #f4ce14;
  font-family: 'Markazi Text', serif;
  font-weight: 500;
  font-size: 40pt;
  margin: 0;

  /* Мобильная версия */
  @media (max-width: 768px) {
    font-size: 24pt;
    text-align: center;
  }
`;

const Subtitle = styled.h1`
  color: white;
  font-family: 'Markazi Text', serif;
  font-weight: 500;
  font-size: 3pt;
  margin: 0;
  padding-bottom: 0px;

  /* Мобильная версия */
  @media (max-width: 768px) {
    font-size: 14pt;
    text-align: center;
  }
`;

const Paragraph = styled.p`
  color: white;
  font-family: 'Karla', sans-serif;
  font-size: 16pt;
  font-weight: 400;

  /* Мобильная версия */
  @media (max-width: 768px) {
    font-size: 14pt;
    text-align: center;
    padding: 0 10px;
  }
`;

const HomeStyled = styled.div`
  background-color: rgb(73, 94, 87);
  margin-bottom: 1vh;
  position: relative;
  overflow: hidden;

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

const BackgroundHeaderStyled = styled.header`

  /* Мобильная версия */
  @media (max-width: 768px) {
    height: auto;
    padding: 20px 0;
  }
`;

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;
  padding: 60px 20px;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 30px 20px;
  }
`;

const ArticleHeader = styled.article`
  max-width: 20%;

  h1 {
    font-family: 'Markazi Text', serif;
    font-weight: 500;
    font-size: 40pt;
    margin: 0;
  }

  h2 {
    font-family: 'Markazi Text', serif;
    font-weight: 500;
    font-size: 18pt;
    margin: 0;
  }

  /* Мобильная версия */
  @media (max-width: 768px) {
    max-width: 80%;
    text-align: center;
  }
`;

const ImgHeader = styled.img`
  width: 100%;
  max-width: 30%;
  height: auto;
  border-radius: 10px;

  /* Мобильная версия */
  @media (max-width: 768px) {
    max-width: 80%;
    margin-top: 20px;
  }
`;

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