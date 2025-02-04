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
import { Card, Row, Col, Tabs, Spin, message } from "antd";
import { Checkbox } from 'antd';
import imageCompression from "browser-image-compression";

const theme = {
  colors: {
    primary: '#495E57',
    secondary: '#F4CE14',
    background: '#F5F7FA',
    text: '#333333',
    border: '#E2E8F0',
    error: '#E53E3E',
    success: '#38A169'
  }
};

Amplify.configure(outputs);
const client = generateClient<Schema>();

const StyledCard = styled(Card)`
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .ant-card-body {
    padding: 1.5rem;
  }

  .card-image {
    height: 200px;
    width: 100%;
    object-fit: cover;
  }

  .card-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0.5rem 0;
  }

  .card-price {
    color: ${theme.colors.primary};
    font-weight: bold;
    font-size: 1.1rem;
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
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  input, textarea, select {
    width: 100%;
    padding: 12px;
    margin: 8px 0;
    border: 1px solid ${theme.colors.border};
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 2px rgba(73, 94, 87, 0.2);
    }
  }

  button {
    width: 100%;
    padding: 12px;
    background: ${theme.colors.primary};
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: ${theme.colors.secondary};
      color: ${theme.colors.text};
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

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background};
  padding: 2rem;
`;

const TabContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-top: 2rem;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
`;

const CategoryList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-top: 1rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 8px;
  padding: 0.5rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.background};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: 4px;
  }
`;

const CategoryItem = styled.div`
  position: relative;
  padding: 0.75rem;
  border-bottom: 1px solid ${theme.colors.border};
  transition: background-color 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${theme.colors.background};

    button {
      opacity: 1;
      transform: translateX(0);
    }
  }

  span {
    flex-grow: 1;
    margin-right: 1rem;
    text-align: left;
  }

  button {
    flex-shrink: 0;
    width: auto;
    opacity: 0;
    transform: translateX(10px);
    transition: all 0.2s ease;
    background-color: ${theme.colors.error};
    color: white;
    border: none;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;

    &:hover {
      background-color: ${theme.colors.error};
      opacity: 0.9;
    }
  }
`;

interface MenuItem {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  category1: string;
  category2: string[];
}

interface Category1 {
  id: string;
  categoryName1: string;
}

interface Category2 {
  id: string;
  categoryName2: string;
}

const EditorMenu = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categoryName1, setCategoryName1] = useState("");
  const [categoryName2, setCategoryName2] = useState("");
  const [categories1, setCategories1] = useState<Category1[]>([]);
  const [categories2, setCategories2] = useState<Category2[]>([]);
  const [category1, setCategory1] = useState("");
  const [category2, setCategory2] = useState<string[]>([]);

  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 800, 
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const fileWithMetadata = new File([compressedFile], file.name, {
        type: compressedFile.type,
        lastModified: Date.now(),
      });

      return fileWithMetadata;
    } catch (error) {
      console.error("Error during image compression", error);
      throw error;
    }
  };

  const processFile = async ({ key, file }: { key: string; file: File }): Promise<{ key: string; file: File }> => {
    try {
      const compressedFile = await compressImage(file);
      return { key, file: compressedFile };
    } catch (error) {
      console.error("Error during file processing", error);
      return { key, file };
    }
  };

  const fetchMenu = async () => {
    try {
      const { data: items } = await client.models.ItemMenu.list();
      setMenuItems(items as MenuItem[]);
      
      const { data: data_categories1 } = await client.models.Category1.list();
      setCategories1(data_categories1 as Category1[]);
      
      const { data: data_categories2 } = await client.models.Category2.list();
      setCategories2(data_categories2 as Category2[]);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const newItem = {
        title,
        description,
        price,
        image,
        category1,
        category2,
      };
      
      await client.models.ItemMenu.create(newItem);
      
      setTitle("");
      setDescription("");
      setPrice("");
      setImage("");
      setCategory1("");
      setCategory2([]);
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
        <DashboardContainer>
          <h1 style={{ color: theme.colors.primary, marginBottom: '1rem' }}>
            Restaurant Dashboard
          </h1>
          
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Add Menu Item" key="1">
              <FormContainer>
                <h2>Add New Menu Item</h2>
                <input
                  type="text"
                  placeholder="Item Name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <select value={category1} onChange={(e) => setCategory1(e.target.value)}>
                  <option value="" disabled>Select Main Category</option>
                  {categories1.map((cat, idx) => (
                    <option key={idx} value={cat.categoryName1}>
                      {cat.categoryName1}
                    </option>
                  ))}
                </select>
                
                <Checkbox.Group
                  options={categories2
                    .filter(cat => cat.categoryName2)
                    .map(cat => ({
                      label: cat.categoryName2 as string,
                      value: cat.categoryName2 as string,
                    }))}
                  value={category2}
                  onChange={handleCheckboxChange}
                  style={{ margin: '1rem 0' }}
                />
                
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
                  processFile={processFile}
                  isResumable
                />
                
                <button 
                  onClick={handleSubmit} 
                  disabled={!isFormValid}
                  style={{ marginTop: '1rem' }}
                >
                  {isUploading ? <Spin size="small" /> : 'Save Item'}
                </button>
              </FormContainer>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Categories" key="2">
              <CategoryGrid>
                <FormContainer>
                  <h2>Main Categories</h2>
                  <input
                    type="text"
                    placeholder="New Category Name"
                    value={categoryName1}
                    onChange={(e) => setCategoryName1(e.target.value)}
                  />
                  <button onClick={handleSubmit1} disabled={!isFormValid1}>Add Category</button>
                  
                  <CategoryList>
                    {categories1.map(({ id, categoryName1 }) => (
                      <CategoryItem key={id}>
                        <span>{categoryName1}</span>
                        <button onClick={() => handleDelete1(id)}>Delete</button>
                      </CategoryItem>
                    ))}
                  </CategoryList>
                </FormContainer>

                <FormContainer>
                  <h2>Sub Categories</h2>
                  <input
                    type="text"
                    placeholder="Category2 Name"
                    value={categoryName2}
                    onChange={(e) => setCategoryName2(e.target.value)}
                  />
                  <button onClick={handleSubmit2} disabled={!isFormValid2}>Add Category</button>
                  
                  <CategoryList>
                    {categories2.map(({ id, categoryName2 }) => (
                      <CategoryItem key={id}>
                        <span>{categoryName2}</span>
                        <button onClick={() => handleDelete2(id)}>Delete</button>
                      </CategoryItem>
                    ))}
                  </CategoryList>
                </FormContainer>
              </CategoryGrid>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Menu Items" key="3">
              <MenuGrid>
                {menuItems.map((item: MenuItem) => (
                  <StyledCard key={item.id}>
                    {item.image && (
                      <StorageImage
                        alt={item.title}
                        path={item.image}
                        className="card-image"
                      />
                    )}
                    <h3 className="card-title">{item.title}</h3>
                    <p>{item.description}</p>
                    <p className="card-price">{item.price} ZŁ</p>
                    <div style={{ 
                      display: 'flex', 
                      gap: '0.5rem', 
                      flexWrap: 'wrap',
                      marginBottom: '0.5rem' 
                    }}>
                      <span>{item.category1}</span>
                      {Array.isArray(item.category2) && item.category2.map((cat: string, idx: number) => (
                        <span key={idx}>{cat}</span>
                      ))}
                    </div>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </StyledCard>
                ))}
              </MenuGrid>
            </Tabs.TabPane>
          </Tabs>
        </DashboardContainer>
      )}
    </Authenticator>
  );
};

export default EditorMenu;
