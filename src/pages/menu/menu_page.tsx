import styled from 'styled-components';

// Styled Components
const MenuContainer = styled.div`
    text-align: center;
`;

console.log('API_LOCAL', import.meta.env.VITE_API_LOCAL);
console.log('API', import.meta.env.APP_API);
console.log('visibleEnvTest', import.meta.env.VITE_APP_TEST);
// Компонент меню
const Menu = () => {

    return (
        <MenuContainer>
            <h1>Our Menu</h1>
            <h1>{import.meta.env.VITE_API_LOCAL}</h1>
        </MenuContainer>
    );
};

export default Menu;
