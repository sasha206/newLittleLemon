
import logo from "../components/Logo.svg";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  background: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  width: 100%;
`;

const NavbarContent = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  transition: padding 0.3s ease;

  @media (max-width: 968px) {
    padding: 12px 24px;
  }
`;

const Logo = styled.img`
  height: 50px;
  width: auto;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 40px;
  }
`;

const NavMenu = styled.ul<{ isOpen: boolean }>`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 8px;
  align-items: center;

  @media (max-width: 968px) {
    position: fixed;
    flex-direction: column;
    top: 0;
    right: 0;
    height: 100vh;
    width: 280px;
    background: white;
    box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
    padding: 80px 24px 24px;
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 900;
    gap: 16px;
  }
`;

const NavItem = styled.li`
  margin: 0;
  padding: 0;

  @media (max-width: 968px) {
    width: 100%;
  }
`;

const NavButton = styled(NavLink)`
  font-family: 'Karla', sans-serif;
  color: #333333;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  transition: all 0.25s ease;
  display: block;

  &:hover {
    background-color: rgba(73, 94, 87, 0.08);
    color: #495E57;
    transform: translateY(-2px);
  }

  &.active {
    background-color: #495E57;
    color: white;
  }

  @media (max-width: 968px) {
    padding: 12px 16px;
    text-align: center;
    width: 100%;
  }
`;

const CTAButton = styled(NavLink)`
  font-family: 'Karla', sans-serif;
  background-color: #F4CE14;
  color: #333333;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 6px rgba(244, 206, 20, 0.3);

  &:hover {
    background-color: #F1C40F;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(244, 206, 20, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 968px) {
    margin-top: 8px;
    justify-content: center;
    width: 100%;
  }
`;

const MenuToggle = styled.button<{ isOpen: boolean }>`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  position: relative;
  z-index: 1000;

  @media (max-width: 968px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  span {
    display: block;
    width: 24px;
    height: 2px;
    background-color: ${({ isOpen }) => isOpen ? '#495E57' : '#333333'};
    margin: 3px 0;
    transition: all 0.3s ease;
    transform-origin: center;

    &:nth-child(1) {
      transform: ${({ isOpen }) => isOpen ? 'rotate(45deg) translateY(5px)' : 'rotate(0)'};
    }

    &:nth-child(2) {
      opacity: ${({ isOpen }) => isOpen ? '0' : '1'};
    }

    &:nth-child(3) {
      transform: ${({ isOpen }) => isOpen ? 'rotate(-45deg) translateY(-5px)' : 'rotate(0)'};
    }
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 800;
  opacity: ${({ isOpen }) => isOpen ? 1 : 0};
  visibility: ${({ isOpen }) => isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <NavbarContainer style={{ boxShadow: scrolled ? '0 4px 12px rgba(0, 0, 0, 0.1)' : '0 2px 12px rgba(0, 0, 0, 0.08)' }}>
      <NavbarContent>
        <NavLink to="/" onClick={closeMenu}>
          <Logo src={logo} alt="Little Lemon" />
        </NavLink>

        <MenuToggle isOpen={isMenuOpen} onClick={toggleMenu} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </MenuToggle>

        <Overlay isOpen={isMenuOpen} onClick={closeMenu} />

        <NavMenu isOpen={isMenuOpen}>
          <NavItem>
            <NavButton to="/" onClick={closeMenu}>Home</NavButton>
          </NavItem>
          <NavItem>
            <NavButton to="/menu" onClick={closeMenu}>Menu</NavButton>
          </NavItem>
          <NavItem>
            <NavButton to="/login" onClick={closeMenu}>Account</NavButton>
          </NavItem>
          <NavItem>
            <CTAButton to="/reservations" onClick={closeMenu}>
              Book a Table
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </CTAButton>
          </NavItem>
        </NavMenu>
      </NavbarContent>
    </NavbarContainer>
  );
};

export default Navbar;