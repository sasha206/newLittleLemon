import styled from 'styled-components';
import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';
import type { Schema } from '../../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'
const MenuContainer = styled.div`
    text-align: center;
`;
Amplify.configure(outputs);
const client = generateClient<Schema>();


const createItem = async () => {
    await client.models.ItemMenu.create({
      title: window.prompt("Item menu?"),
      isDone: false,
    })
  }
  const { data: newItem } = await client.models.ItemMenu.create({
    title: "Pizza",
    isDone: true,
  })
  





console.log('API_LOCAL', import.meta.env.VITE_API_LOCAL);
console.log('API', import.meta.env.APP_API);
console.log('visibleEnvTest', import.meta.env.VITE_APP_TEST);
const Menu = () => {

    return (
        <MenuContainer>
            <button onClick={createItem}>Add new Item</button>
            <h1>{newItem?.title}</h1>

            <h1>Our Menu</h1>
            <h1>{import.meta.env.VITE_API_LOCAL}</h1>
        </MenuContainer>
    );
};

export default Menu;
