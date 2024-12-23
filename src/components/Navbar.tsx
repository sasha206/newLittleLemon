import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../components/Logo.svg";

const DivNav = styled.div``;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 0;
  margin: 0 120px;

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 0 20px;
  }
`;

const Logo = styled.img`
  height: auto;
  width: auto;
`;

const UlStyled = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  opacity: 1; /* На больших экранах меню всегда видимо */
  transition: opacity 0.3s ease-in-out; /* Плавное появление меню */

  @media (max-width: 768px) {
    display: none; /* Скрываем меню на мобильных */
    flex-direction: column;
    width: 100%;
    text-align: center;
    opacity: 0; /* Скрываем меню по умолчанию */
  }

  &.active {
    display: flex;
    opacity: 1; /* Показываем меню, когда оно активировано */
  }
`;

const NavItem = styled.li`
  margin-left: 20px;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-bottom: 15px;
  }
`;

const LinkStyled = styled(NavLink)`
  color: black;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 11px;
  font-family: 'Karla', sans-serif;

  &:hover {
    background-color: #BBBBBB;
  }

  &:active {
    background-color: #BBBBBB;
    color: white;
  }

  &.active {
    background-color: rgb(73, 94, 87);
    color: white;
  }
`;

const BurgerButton = styled.div`
  margin-top: 5px;
  margin-bottom:15px;
  display: none;
  cursor: pointer;
  flex-direction: column;
  gap: 4px;
  transition: transform 0.3s ease-in-out; /* Анимация для бургер кнопки */

  @media (max-width: 768px) {
    display: flex;
  }

  div {
    width: 30px;
    height: 3px;
    background-color: black;
    border-radius: 3px; /* Скругляем полоски */
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out; /* Анимации для полосок */
  }

  &.active div:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px); /* Первая полоска поворачивается */
  }

  &.active div:nth-child(2) {
    opacity: 0; /* Вторая полоска исчезает */
  }

  &.active div:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px); /* Третья полоска поворачивается */
  }
`;

const NavBar = () => {
  const toggleMenu = () => {
    const menu = document.getElementById('menu');
    const burger = document.getElementById('burger');
    if (menu) {
      menu.classList.toggle('active'); // Добавляем или убираем класс .active для меню
    }
    if (burger) {
      burger.classList.toggle('active'); // Добавляем или убираем класс .active для бургер кнопки
    }
  };

  return (
    <DivNav>
      <Navbar>
        <NavLink to={"/"}><Logo src={logo} /></NavLink>
        <BurgerButton id="burger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </BurgerButton>
        <UlStyled id="menu">
          <NavItem><LinkStyled to="/menu">Menu</LinkStyled></NavItem>
          <NavItem><LinkStyled to="/reservations">Reservations</LinkStyled></NavItem>
          <NavItem><LinkStyled to="/order">Order Online</LinkStyled></NavItem>
          <NavItem><LinkStyled to="/login">Login</LinkStyled></NavItem>
          <NavItem><LinkStyled to="/about">About</LinkStyled></NavItem>
        </UlStyled>
      </Navbar>
    </DivNav>
  );
};

export default NavBar;
