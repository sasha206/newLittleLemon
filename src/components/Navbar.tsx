import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../components/Logo.svg";

const DivNav = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  margin: 0 120px;

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 0 20px;
  }
`;

const Logo = styled.img`
  height: auto;
  width: auto;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const UlStyled = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  opacity: 1; 
  transition: opacity 0.3s ease-in-out; 
  transform: translateY(0);

  @media (max-width: 768px) {
    display: none;
    flex-direction: column;
    width: 100%;
    text-align: center;
    opacity: 0; // Hide the menu if the .active class is not present
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-100%);
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  &.active {
    display: flex;
    opacity: 1; // Show the menu if the .active class is present
    transform: translateY(0);
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
  padding: 8px 16px;
  border-radius: 8px;
  font-family: 'Karla', sans-serif;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background-color: rgba(73, 94, 87, 0.1);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &.active {
    background-color: rgb(73, 94, 87);
    color: white;
    &:hover {
      background-color: rgb(83, 104, 97);
    }
  }
`;

const BurgerButton = styled.div`
  margin-top: 5px;
  margin-bottom:15px;
  display: none;
  cursor: pointer;
  flex-direction: column;
  gap: 4px;
  transition: transform 0.3s ease-in-out; //animation for burger menu

  @media (max-width: 768px) {
    display: flex;
  }

  div {
    width: 30px;
    height: 3px;
    background-color: black;
    border-radius: 3px; 
    transition: all 0.3s ease;
  }

  &.active div:nth-child(1) {
    transform: rotate(45deg) translate(6px, 6px); 
  }

  &.active div:nth-child(2) {
    transform: translateX(-100%);
    opacity: 0; 
  }

  &.active div:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -6px);
  }
`;

const NavBar = () => {
  const toggleMenu = () => {
    const menu = document.getElementById('menu');
    const burger = document.getElementById('burger');
    if (menu) {
      menu.classList.toggle('active'); 
    }
    if (burger) {
      burger.classList.toggle('active'); // Add or remove the .active class for the burger button
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
          <NavItem><LinkStyled to="/">About</LinkStyled></NavItem>
          <NavItem><LinkStyled to="/menu">Menu</LinkStyled></NavItem>
          <NavItem><LinkStyled to="/reservations">Reservations</LinkStyled></NavItem>
          <NavItem><LinkStyled to="/login">Account</LinkStyled></NavItem>
        </UlStyled>
      </Navbar>
    </DivNav>
  );
};

export default NavBar;
