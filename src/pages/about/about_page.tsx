import { useState, useEffect } from 'react';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import { FileUploader } from '@aws-amplify/ui-react-storage';
import styled from 'styled-components';
import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

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

  img {
    max-width: 100px;
    max-height: 100px;
    margin-left: 10px;
  }
`;

const App = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [fileUploaderKey, setFileUploaderKey] = useState(Date.now());
  const [menuItems, setMenuItems] = useState<Schema['ItemMenu']['type'][]>([]);

  const fetchMenuItems = async () => {
    try {
      const { data: items } = await client.models.ItemMenu.list();
      setMenuItems(items);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (image) {
        const { data: newItem } = await client.models.ItemMenu.create({
          title,
          description,
          price,
          image,
        });

        console.log('New Item Created:', newItem);

        // Очистка формы
        setTitle('');
        setDescription('');
        setPrice('');
        setImage('');
        setFileUploaderKey(Date.now()); // Сброс FileUploader

        fetchMenuItems();
      } else {
        console.error('No file uploaded!');
      }
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await client.models.ItemMenu.delete({ id });
      fetchMenuItems();
      console.log(`Item with id ${id} deleted.`);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <div>
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
        <FileUploader
          maxFileCount={1}
          key={fileUploaderKey} // Сброс компонента
          acceptedFileTypes={['image/*']}
          path="public/"
          onUploadSuccess={(event) => setImage(event.key || '')}
          autoUpload={true}
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
                {image && <StorageImage alt='none' path={`public/${image}`} />}
              </div>
              <button onClick={() => handleDelete(id)}>Delete</button>
            </MenuItem>
          ))
        )}
      </MenuListContainer>
    </div>
  );
};

export default App;
