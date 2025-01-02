import '@aws-amplify/ui-react/styles.css';
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import outputs from "../../../../amplify_outputs.json";
import type { Schema } from "../../../../amplify/data/resource";
import { FileUploader } from '@aws-amplify/ui-react-storage';
import { Authenticator } from '@aws-amplify/ui-react';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import { Card, Row, Col } from "antd";
import { Checkbox } from 'antd';


Amplify.configure(outputs);
const client = generateClient<Schema>();

const StyledCard = styled(Card)`
  margin: 10px;
  border-radius: 10px;

  .ant-card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    border-radius: 10px;
    margin-bottom: 10px;
    width: 100%;
    max-height: 200px;
    object-fit: cover;
  }
`;

const ScrollList = styled.div`
  width: 300px;
  height: 400px;
  border: 1px solid #ccc;
  padding: 10px;
  overflow-y: auto;
`;

const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const LayoutContainerCategory = styled.div`
  display: grid;
  grid-template-rows: 50% 50%;
`;

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

    &:disabled {
      background-color: #ddd;
      cursor: not-allowed;
    }
  }
`;

const FormCategoryContainer = styled.div`
  text-align: center;
  margin: 5px;

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

    &:disabled {
      background-color: #ddd;
      cursor: not-allowed;
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

const FileUploaderContainer = styled.div`
  width: 80%;
  max-width: 300px;
  margin: 0 auto;
`;

const EditorMenu = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [menuItems, setMenuItems] = useState<Schema["ItemMenu"]["type"][]>([]);
  const [categoryName1, setCategoryName1] = useState("");
  const [categoryName2, setCategoryName2] = useState("");
  const [categories1, setCategories1] = useState<Schema["Category1"]["type"][]>([]);
  const [categories2, setCategories2] = useState<Schema["Category2"]["type"][]>([]);
  const [category1, setCategory1] = useState("");
  const [category2, setCategory2] = useState<string[]>([]);

  const fetchMenu = async () => {
    try {
      const { data: items } = await client.models.ItemMenu.list();
      setMenuItems(items);
      const { data: data_categories1 } = await client.models.Category1.list();
      setCategories1(data_categories1);
      const { data: data_categories2 } = await client.models.Category2.list();
      setCategories2(data_categories2);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const { data: newItem } = await client.models.ItemMenu.create({
        title,
        description,
        price,
        image,
        category1,
        category2: category2,
      });
      console.log("New Item Created:", newItem);
      console.log(category2)

      setTitle("");
      setDescription("");
      setPrice("");
      setImage("");
      setCategory1("");
      fetchMenu();
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const handleSubmit1 = async () => {
    try {
      const { data: newItem } = await client.models.Category1.create({
        categoryName1
      });
      console.log("New Category1 Created:", newItem);

      setCategoryName1("");
      fetchMenu();
    } catch (error) {
      console.error("Error creating category1:", error);
    }
  };

  const handleSubmit2 = async () => {
    try {
      const { data: newItem } = await client.models.Category2.create({
        categoryName2
      });
      console.log("New Category2 Created:", newItem);

      setCategoryName2("");
      fetchMenu();
    } catch (error) {
      console.error("Error creating category2:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await client.models.ItemMenu.delete({ id });
      fetchMenu();
      console.log(`Item with id ${id} deleted.`);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleDelete1 = async (id: string) => {
    try {
      await client.models.Category1.delete({ id });
      fetchMenu();
      console.log(`Category1 with id ${id} deleted.`);
    } catch (error) {
      console.error("Error deleting category1:", error);
    }
  };

  const handleDelete2 = async (id: string) => {
    try {
      await client.models.Category2.delete({ id });
      fetchMenu();
      console.log(`Category2 with id ${id} deleted.`);
    } catch (error) {
      console.error("Error deleting category2:", error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const isFormValid = title && description && price && !isUploading;
  const isFormValid1 = categoryName1;
  const isFormValid2 = categoryName2;

    const handleCheckboxChange = (checkedValues: string[]) => {
      setCategory2(checkedValues);
    };

  return (
    <Authenticator>
      {({ user }) => (
        <div>
          <h1>Welcome, {user?.username}</h1>
          <LayoutContainer>
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
            <select value={category1} onChange={(e) => setCategory1(e.target.value)}>
            <option value="" disabled>Select Main Category</option>
              {categories1.map((category1, id) => (
                <option key={id} value={`${category1.categoryName1}`}>
                {category1.categoryName1}
                </option>
              ))}
            </select>
            <legend>Please select your preferred category2:</legend>
      <Checkbox.Group
  options={categories2
    .filter((category) => category.categoryName2 !== null && category.categoryName2 !== undefined)
    .map((category) => ({
      label: category.categoryName2 as string,
      value: category.categoryName2 as string,
    }))} 
  value={category2}
  onChange={handleCheckboxChange}
  style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
/>
            <FileUploaderContainer>
              <FileUploader
                onUploadStart={() => setIsUploading(true)}
                acceptedFileTypes={['image/*']}
                path="public/"
                autoUpload={true}
                onUploadSuccess={(event) => {
                  setImage(event.key || '');
                  setIsUploading(false);
                }}
                maxFileCount={1}
                isResumable
              />
            </FileUploaderContainer>
            <button onClick={handleSubmit} disabled={!isFormValid}>Save Item</button>
          </FormContainer>
          <LayoutContainerCategory>
          <FormCategoryContainer>
            <h1>Add Category 1</h1>
            <input
              type="text"
              placeholder="Category1 Name"
              value={categoryName1}
              onChange={(e) => setCategoryName1(e.target.value)}
            />
            <button onClick={handleSubmit1} disabled={!isFormValid1}>Save Category</button>
          </FormCategoryContainer>
          <FormCategoryContainer>
            <h1>Add Category 2</h1>
            <input
              type="text"
              placeholder="Category2 Name"
              value={categoryName2}
              onChange={(e) => setCategoryName2(e.target.value)}
            />
            <button onClick={handleSubmit2} disabled={!isFormValid2}>Save Category</button>
          </FormCategoryContainer>
          </LayoutContainerCategory>
          <ScrollList>
            <h2>Category 1 List</h2>
            {categories1.length === 0 ? (
              <p>No categories available.</p>
            ) : (
              categories1.map(({ id, categoryName1 }) => (
                <MenuItem key={id}>
                  <div>
                    <h3>{categoryName1}</h3>
                  </div>
                  <button onClick={() => handleDelete1(id)}>Delete</button>
                </MenuItem>
              ))
            )}
          </ScrollList>
          <ScrollList>
            <h2>Category 2 List</h2>
            {categories2.length === 0 ? (
              <p>No categories available.</p>
            ) : (
              categories2.map(({ id, categoryName2 }) => (
                <MenuItem key={id}>
                  <div>
                    <h3>{categoryName2}</h3>
                  </div>
                  <button onClick={() => handleDelete2(id)}>Delete</button>
                </MenuItem>
              ))
            )}
          </ScrollList>

        </LayoutContainer>
        <MenuListContainer>
            <h2>Menu Items</h2>
            {menuItems.length === 0 ? (
                    <p style={{ textAlign: "center" }}>No items available in the menu.</p>
                  ) : (
                    <Row gutter={[16, 16]}>
                      {menuItems.map(({ id, title, description, image, price, category1, category2 }) => (
                        <Col key={id} xs={24} sm={12} md={8} lg={6}>
                          <StyledCard hoverable>
                          {image && (
                            <StorageImage
                            alt='none'
                            path={`${image}`}
                            style={{ borderRadius: "10px", marginBottom: "10px", width: "100%", height: "200px", objectFit: "cover" }}
                            />
                          )}
            
                            <h3>{title}</h3>
                            <p>{description}</p>
                            <p style={{ fontWeight: "bold" }}>{price} ZŁ</p>
                            <p>{category1}</p>
                            <p>{category2}</p>
                            <button onClick={() => handleDelete(id)}>Delete</button>
                          </StyledCard>
                        </Col>
                      ))}
                    </Row>
                  )}
          </MenuListContainer>
        </div>
      )}
    </Authenticator>
  );
};

export default EditorMenu;
