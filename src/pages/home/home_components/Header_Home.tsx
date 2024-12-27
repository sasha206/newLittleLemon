import styled from "styled-components";
import HeaderImg from "../home_components/restauranfood.jpg";
import { Button } from "antd";
import { StorageImage } from "@aws-amplify/ui-react-storage";

const CustomButton = styled(Button)`
  background-color: #f4ce14;
  border: none;
  color: black;
  font-size: 18px;
  text-decoration: none;
  border-radius: 11px;
  margin-left: 6px;
  &:hover {
    background-color: #bbbbbb;
  }
  
  /* Мобильная версия */
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 8px 16px;
    margin-left: 0;
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
  align-items: top;
  margin: 0 120px;
  padding: 40px 0;

  /* Мобильная версия */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin: 0 20px;
    padding: 20px 0;
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
            <StorageImage alt="sleepy-cat" path="public/Instagram_Glyph_White.png" />
            <CustomButton href="/reservations">Reserve a Table</CustomButton>
          </ArticleHeader>
          <ImgHeader src={HeaderImg} />
        </HeaderStyled>
      </BackgroundHeaderStyled>
    </HomeStyled>
  );
};

export default Header;