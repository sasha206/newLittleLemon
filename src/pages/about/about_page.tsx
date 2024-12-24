import { useState, useEffect } from "react";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';

Amplify.configure(outputs);

const client = generateClient<Schema>();



export default function ItemList() {
  const [items, setItems] = useState<Schema["ItemMenu"]["type"][]>([]);

  const fetchItems = async () => {
    const { data: items } = await client.models.ItemMenu.list();
    setItems(items);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const createItem = async () => {
    await client.models.ItemMenu.create({
      title: window.prompt("Todo content?"),
    });
    fetchItems();
  }

  return (
    <div>
      <button onClick={createItem}>Add new item</button>
      <ul>
        {items.map(({ id, title}) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </div>
  );
}