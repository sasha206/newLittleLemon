import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { signOut } from "aws-amplify/auth";
import { Button } from "antd";

const DivNav = styled.div`
  position: fixed;
  z-index: 1000; /* Элемент будет позади */
  visibility: hidden; /* Элемент скрыт по умолчанию */
  opacity: 0; /* Элемент полностью прозрачен */
  transition: opacity 0.3s ease, visibility 0s 0.3s; /* Задержка на visibility */

  &.active {
    visibility: visible; /* Элемент становится видимым */
    opacity: 1; /* Элемент становится непрозрачным */
    transition: opacity 0.3s ease, visibility 0s 0s; /* Без задержки для visibility */
  }
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
  visibility: visible; /* Логотип всегда видимый */
  opacity: 1;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1100;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &.active {
    transform: rotate(45deg); /* Поворот логотипа */
  }

  img {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 768px) {
    right: 20px;
    left: auto;
  }
`;

const NavBarLogin = () => {
  const toggleMenu = () => {
    const menuLogin = document.getElementById('menuLogin');
    const lemonLogo = document.getElementById('lemonLogo');
    const divNav = document.getElementById('divNav');  // добавляем id для DivNav
    
    if (menuLogin) {
      menuLogin.classList.toggle('active');
    }
    if (lemonLogo) {
      lemonLogo.classList.toggle('active');
    }
    if (divNav) {
      divNav.classList.toggle('active');  // управляем видимостью DivNav
    }
  };
  

  async function buttonSignOut() {
    await signOut({ global: true });
  }

  return (
    <div>
  <Lemon id="lemonLogo" onClick={toggleMenu}>
    <img src="/icons8-lemon-100.png" alt="Menu Icon" />
  </Lemon>
<DivNav id="divNav">
  <Sidebar id="menuLogin">
    <UlStyled>
      <NavItem>
        <LinkStyled to="/login/editor_menu">Menu Editor</LinkStyled>
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
</div>
  );
};

export default NavBarLogin;
