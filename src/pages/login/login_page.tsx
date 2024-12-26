import { Authenticator } from '@aws-amplify/ui-react';
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import outputs from "../../../amplify_outputs.json";
import type { Schema } from "../../../amplify/data/resource";

Amplify.configure(outputs);
const client = generateClient<Schema>();

const FormContainer = styled.div`
  text-align: center;
  margin: 20px;

  input {
    display: block;
    margin: 10px auto;
    padding: 10px;
    width: 80%;
    max-width: 300px;
  }

  button {
    padding: 10px 20px;
    margin-top: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const MenuListContainer = styled.div`
  margin: 20px;
  text-align: center;
`;

const MenuItem = styled.div`
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
`;

const Login = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [menuItems, setMenuItems] = useState<Schema["ItemMenu"]["type"][]>([]);

  const fetchMenuItems = async () => {
    try {
      const { data: items } = await client.models.ItemMenu.list();
      setMenuItems(items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const { data: newItem } = await client.models.ItemMenu.create({
        title,
        description,
        price, // Преобразование цены в число
        image,
      });
      console.log("New Item Created:", newItem);

      setTitle("");
      setDescription("");
      setPrice("");
      setImage("");
      fetchMenuItems();
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await client.models.ItemMenu.delete({ id });
      fetchMenuItems();
      console.log(`Item with id ${id} deleted.`);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <Authenticator signUpAttributes={['phone_number']}>
      {({ signOut, user }) => (
        <div>
          <h1>Welcome, {user?.username}</h1>
          <button onClick={signOut}>Sign Out</button>
          <FormContainer>
            <h1>Add New Menu Item</h1>
            <input
              type="text"
              placeholder="Item Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <button onClick={handleSubmit}>Save Item</button>
          </FormContainer>
          <MenuListContainer>
            <h2>Menu Items</h2>
            {menuItems.length === 0 ? (
              <p>No items available in the menu.</p>
            ) : (
              menuItems.map(({ id, title, description, image, price }) => (
                <MenuItem key={id}>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <p>{price} USD</p>
                    {image && <img src={image} width="100" />}
                  </div>
                  <button onClick={() => handleDelete(id)}>Delete</button>
                </MenuItem>
              ))
            )}
          </MenuListContainer>
        </div>
      )}
    </Authenticator>
  );
};

export default Login;
