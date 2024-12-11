import styled from 'styled-components';

// Styled Components
const MenuContainer = styled.div`
    text-align: center;
`;

console.log('REACT_APP_TEST_VARIABLE', import.meta.env.REACT_APP_TEST_VARIABLE);

// Компонент меню
const Menu = () => {

    return (
        <MenuContainer>
            <h1>Our Menu</h1>
        </MenuContainer>
    );
};

export default Menu;
