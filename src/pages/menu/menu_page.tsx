import { useState } from "react";
import styled from "styled-components";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import outputs from "../../../amplify_outputs.json";
import type { Schema } from "../../../amplify/data/resource";

// Конфигурация AWS
Amplify.configure(outputs);
const client = generateClient<Schema>();

// Styled Components
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

// Компонент формы
const AddItemForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async () => {
    try {
      const { data: newItem } = await client.models.ItemMenu.create({
        title,
        description,
        price, // Преобразование цены в число
        image,
      });
      console.log("New Item Created:", newItem);

      // Очистить форму после успешного добавления
      setTitle("");
      setDescription("");
      setPrice("");
      setImage("");
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
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
  );
};

export default AddItemForm;
