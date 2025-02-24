import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { signOut, fetchAuthSession } from "aws-amplify/auth";
import { Button } from "antd";
import { useEffect, useState } from "react";

const DivNav = styled.div`
  position: fixed;
  z-index: 1000;
  visibility: hidden;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  &.active {
    visibility: visible;
    opacity: 1;
  }

  @media (max-width: 768px) {
    background-color: transparent;
    &.active {
      background-color: transparent;
    }
  }
`;

const Sidebar = styled.nav`
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  transform: translateX(-100%);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &.active {
    transform: translateX(0);
  }

  @media (max-width: 768px) {
    width: auto;
    min-width: 200px;
    max-width: 80%;
    height: auto;
    max-height: 400px;
    position: fixed;
    top: 70px;
    right: 20px;
    left: auto;
    border-radius: 16px;
    padding: 16px;
    transform: translateX(120%);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

    &.active {
      transform: translateX(0);
    }
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
  color: #333333;
  text-decoration: none;
  padding: 12px 16px;
  display: block;
  border-radius: 12px;
  font-family: 'Karla', sans-serif;
  font-weight: 500;
  transition: all 0.3s ease;
  width: 100%;
  margin-bottom: 8px;

  &:hover {
    background-color: #f5f5f5;
    transform: translateX(5px);
  }

  &:active,
  &.active {
    background-color: #495e57;
    color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: 14px;
  }
`;

const CustomButton = styled(Button)`
  background-color: #ff9100;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 20px;
  height: auto;
  border-radius: 12px;
  width: 100%;
  margin-top: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #ff7b00;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    margin-top: 10px;
    padding: 8px 16px;
    font-size: 14px;
  }
`;

const Lemon = styled.div`
  visibility: visible;
  opacity: 1;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1100;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 12px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 3px solid #1b1b1b;

  &:hover {
    transform: scale(1.15); 
    box-shadow: 0 4px 12px rgba(73, 94, 87, 0.3);
  }

  &.active {
    border-color: #ff9100;
    transform: rotate(90deg);
  }

  .icon {
    width: 30px;
    height: 30px;
    position: relative;
    display: block;
  }

  .icon-primary,
  .icon-secondary {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .icon-secondary {
    opacity: 0;
    transform: rotate(-180deg);
  }

  &.active {
    .icon-primary {
      opacity: 0;
      transform: rotate(180deg);
    }
    
    .icon-secondary {
      opacity: 1;
      transform: rotate(0);
    }
  }

  @media (max-width: 768px) {
    right: 20px;
    left: auto;
  }
`;

const NavBarLogin = () => {
  const [isUsers, setIsUsers] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    checkUserPermissions();
  }, []);

  const checkUserPermissions = async () => {
    try {
      const {tokens} = await fetchAuthSession({ forceRefresh: true});
      const groups = tokens?.accessToken?.payload['cognito:groups'] as string[];
      //check if the user is in the users group
      setIsUsers(groups.length === 1 && groups.includes('users'));
    } catch (error) {
      console.error('Error checking user permissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    const menuLogin = document.getElementById('menuLogin');
    const lemonLogo = document.getElementById('lemonLogo');
    const divNav = document.getElementById('divNav');
    
    if (menuLogin) {
      menuLogin.classList.toggle('active');
    }
    if (lemonLogo) {
      lemonLogo.classList.toggle('active');
    }
    if (divNav) {
      divNav.classList.toggle('active');  // toggle the visibility of the sidebar
    }
  };
  

  async function buttonSignOut() {
    await signOut({ global: true });
  }

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <div>
      <Lemon id="lemonLogo" onClick={toggleMenu}>
        <div className="icon">
          <img 
            className="icon-primary" 
            src="/lemon.png" 
            alt="Menu Open Icon" 
          />
          <img 
            className="icon-secondary" 
            src="/lemonOff.png" 
            alt="Menu Close Icon" 
          />
        </div>
      </Lemon>
      <DivNav id="divNav">
        <Sidebar id="menuLogin">
          <UlStyled>
            {!isUsers && (
              <>
                <NavItem>
                  <LinkStyled to="/login/editor_menu">Menu Editor</LinkStyled>
                </NavItem>
                <NavItem>
                  <LinkStyled to="/login/admin_panel">Admin</LinkStyled>
                </NavItem>
                <NavItem>
                  <LinkStyled to="/login/analytics_page">Analytics</LinkStyled>
                </NavItem>
              </>
            )}
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
