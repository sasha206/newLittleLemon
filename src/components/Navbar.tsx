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
  margin: 1;
  padding: 0;

  @media (max-width: 768px) {
    display: none; /* Скрываем меню на мобильных */
    flex-direction: column;
    width: 100%;
    text-align: center;
  }

  @media (min-width: 769px) {
    display: flex; /* Показываем меню для экранов более 768px */
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
  display: none;
  cursor: pointer;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 768px) {
    display: flex;
  }

  div {
    width: 30px;
    height: 3px;
    background-color: black;
  }
`;

const NavBar = () => {
  const toggleMenu = () => {
    const menu = document.getElementById('menu');
    if (menu) {
      menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    }
  };

  return (
    <DivNav>
      <Navbar>
        <Logo src={logo} />
        <BurgerButton onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </BurgerButton>
        <UlStyled id="menu">
          <NavItem><LinkStyled to="/">Home</LinkStyled></NavItem>
          <NavItem><LinkStyled to="/about">About</LinkStyled></NavItem>
          <NavItem><LinkStyled to="/menu">Menu</LinkStyled></NavItem>
          <NavItem><LinkStyled to="/reservations">Reservations</LinkStyled></NavItem>
          <NavItem><LinkStyled to="/order">Order Online</LinkStyled></NavItem>
          <NavItem><LinkStyled to="/login">Login</LinkStyled></NavItem>
        </UlStyled>
      </Navbar>
    </DivNav>
  );
};

export default NavBar;
