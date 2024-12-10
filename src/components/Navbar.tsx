import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../components/Logo.svg";

const DivNav = styled.div`

    `;


const Navbar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:25px 0;
    margin: 0 120px;

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
`;
const NavItem = styled.li`
    margin-left: 20px;
`;
const LinkStyled = styled(NavLink)`
    color: black;
    text-decoration: none;
    padding: 5px 10px;
    border-radius:11px;
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


const NavBar = () => {
    return(
        <DivNav>
            <Navbar>
                <Logo src={logo}/>
                <UlStyled>
                    <NavItem><LinkStyled to="/">Home</LinkStyled></NavItem>
                    <NavItem><LinkStyled to="/about">About</LinkStyled></NavItem>
                    <NavItem><LinkStyled to="/menu">Menu</LinkStyled></NavItem>
                    <NavItem><LinkStyled to="/reservations">Reservations</LinkStyled></NavItem>
                    <NavItem><LinkStyled to="/order">Order Online</LinkStyled></NavItem>
                    <NavItem><LinkStyled to="/login">Login</LinkStyled></NavItem>
                    
                </UlStyled>

            </Navbar>
        </DivNav>
    )
}
export default NavBar;