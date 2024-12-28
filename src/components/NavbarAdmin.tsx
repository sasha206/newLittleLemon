import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { signOut } from "aws-amplify/auth";
import { Button } from "antd";

const DivNav = styled.div`
  position: fixed;
  z-index: 1000;
`;

const Sidebar = styled.nav`
  top: 0;
  left: 0;
  height: 100%;
  width: 200px;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;

  &.active {
    transform: translateX(0);
  }
`;

const UlStyled = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const NavItem = styled.li`
  margin-bottom: 20px;
  width: 100%;

  &:last-child {
    margin-bottom: 0;
  }
`;

const LinkStyled = styled(NavLink)`
  color: black;
  text-decoration: none;
  padding: 10px 15px;
  display: block;
  border-radius: 8px;
  font-family: 'Karla', sans-serif;

  &:hover {
    background-color: #bbbbbb;
  }

  &:active,
  &.active {
    background-color: rgb(73, 94, 87);
    color: white;
  }
`;

const CustomButton = styled(Button)`
  background-color: #ff9100;
  border: none;
  color: black;
  font-size: 18px;
  text-decoration: none;
  border-radius: 11px;
  margin-left: 6px;

  &:hover {
    background-color: #bbbbbb;
  }
`;

const Lemon = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1100;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &.active {
    transform: rotate(45deg);
  }

  img {
    width: 30px;
    height: 30px;
  }
`;

const NavBarLogin = () => {
  const toggleMenu = () => {
    const menuLogin = document.getElementById('menuLogin');
    const lemonLogo = document.getElementById('lemonLogo');
    if (menuLogin) {
      menuLogin.classList.toggle('active');
    }
    if (lemonLogo) {
      lemonLogo.classList.toggle('active');
    }
  };

  async function buttonSignOut() {
    await signOut({ global: true });
  }

  return (
    <DivNav>
      <Lemon id="lemonLogo" onClick={toggleMenu}>
        <img src="/icons8-lemon-100.png" alt="Menu Icon" />
      </Lemon>
      <Sidebar id="menuLogin">
        <UlStyled>
          <NavItem>
            <LinkStyled to="/login/editor_menu">Menu</LinkStyled>
          </NavItem>
          <NavItem>
            <LinkStyled to="/login/admin_panel">Admin</LinkStyled>
          </NavItem>
          <NavItem>
            <LinkStyled to="/login/analytics_page">Analytics</LinkStyled>
          </NavItem>
          <NavItem>
            <CustomButton onClick={buttonSignOut}>Sign out</CustomButton>
          </NavItem>
        </UlStyled>
      </Sidebar>
    </DivNav>
  );
};

export default NavBarLogin;
