import { useState, useEffect } from "react";
import styled from "styled-components";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { Card, Row, Col, Checkbox, Radio, Spin, Button } from "antd";
import outputs from "../../../amplify_outputs.json";
import type { Schema } from "../../../amplify/data/resource";
import { StorageImage } from "@aws-amplify/ui-react-storage";

Amplify.configure(outputs);
const client = generateClient<Schema>();

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const FilterSection = styled.div`
  background: #f5f5f5;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const CategoryTitle = styled.h3`
  margin-bottom: 15px;
  font-size: 1.2rem;
  color: #333;
`;

const MenuTitle = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5rem;
`;

const StyledCard = styled(Card)<{ highlight?: boolean }>`
  margin: 10px;
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  
  .ant-card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  ${(props) =>
    props.highlight &&
    `
    border: 3px solid #52c41a;
    transform: scale(1.02);
    `}

  img {
    border-radius: 10px;
    margin-bottom: 10px;
    width: 100%;
    max-height: 200px;
    object-fit: cover;
  }
`;

const Flex = styled.div<{ vertical?: boolean; gap?: string }>`
  display: flex;
  flex-direction: ${({ vertical }) => (vertical ? "column" : "row")};
  gap: ${({ gap }) => (gap === "middle" ? "16px" : "8px")};
  align-items: flex-start;
`;

const StyledRadioGroup = styled(Radio.Group)`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .ant-radio-button-wrapper {
    white-space: normal; 
    text-align: center; 
    height: auto; 
    padding: 10px; 
    line-height: 1.2; 
    flex: 1 0 calc(25% - 10px); 
  }

  @media (max-width: 768px) {
    .ant-radio-button-wrapper {
      flex: 1 0 calc(50% - 10px); 
    }
  }

  @media (max-width: 480px) {
    .ant-radio-button-wrapper {
      flex: 1 0 100%; 
    }
  }
`;

const ResetButton = styled(Button)`
  margin-bottom: 15px;
  background-color: #f5f5f5;
  border-color: #d9d9d9;

  &:hover {
    background-color: #e8e8e8;
  }
`;

const Menu = () => {
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState<Schema["ItemMenu"]["type"][]>([]);
  const [menuCategories1, setMenuCategories1] = useState<Schema["Category1"]["type"][]>([]);
  const [menuCategories2, setMenuCategories2] = useState<Schema["Category2"]["type"][]>([]);
  const [selectedCategory1, setSelectedCategory1] = useState<string>("");
  const [selectedCategory2, setSelectedCategory2] = useState<string[]>([]);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const { data: items } = await client.models.ItemMenu.list({authMode: 'apiKey'});
      setMenuItems(items);
      const { data: items1 } = await client.models.Category1.list({authMode: 'apiKey'});
      setMenuCategories1(items1);
      const { data: items2 } = await client.models.Category2.list({authMode: 'apiKey'});
      setMenuCategories2(items2);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMenu();
  }, []);
  useEffect(() => {
    console.log(selectedCategory2);
  }, [selectedCategory2]);
  useEffect(() => {
    console.log(menuItems);
  }, [selectedCategory2]);

  const filteredMenuItems1 = menuItems.filter((item) => {
    return selectedCategory1 ? item.category1 === selectedCategory1 : true;
  });


  const handleCheckboxChange = (checkedValues: string[]) => {
    setSelectedCategory2(checkedValues);
  };

  return (
    <PageContainer>
      <FilterSection>
        <ResetButton 
          onClick={() => {
            setSelectedCategory1('');
            setSelectedCategory2([]);
          }}
        >
          Reset Filters
        </ResetButton>
        
        <CategoryTitle>Main Categories</CategoryTitle>
        <Flex vertical gap="middle">
          <StyledRadioGroup
            options={menuCategories1
              .filter((category) => category.categoryName1 !== null && category.categoryName1 !== undefined)
              .map((category) => ({
                label: category.categoryName1 as string,
                value: category.categoryName1 as string,
              }))}
              value={selectedCategory1}
              onChange={(e) => setSelectedCategory1(e.target.value)}
            optionType="button"
            buttonStyle="solid"
          />
        </Flex>

        <CategoryTitle>Dietary Preferences</CategoryTitle>
        <Checkbox.Group
          style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
          options={menuCategories2
            .filter((category) => category.categoryName2 !== null && category.categoryName2 !== undefined)
            .map((category) => ({
              label: category.categoryName2 as string,
              value: category.categoryName2 as string,
            }))} 
          value={selectedCategory2}
          onChange={handleCheckboxChange}
        />
      </FilterSection>

      <MenuTitle>Our Menu</MenuTitle>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Spin size="large" />
        </div>
      ) : menuItems.length === 0 ? (
        <div style={{ 
          textAlign: "center", 
          padding: '40px', 
          background: '#f5f5f5',
          borderRadius: '12px'
        }}>
          <h3>No items available</h3>
          <p>Please try different filter options</p>
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {filteredMenuItems1.map(({ id, title, description, image, price, category1, category2 }) => (
            <Col key={id} xs={24} sm={12} md={8} lg={6}>
              <StyledCard
                hoverable
                highlight={category2?.some((cat) => cat && selectedCategory2.includes(cat))}
              >
                {image && (
                  <StorageImage
                    alt={title || 'Menu item'}
                    path={`${image}`}
                    style={{
                      borderRadius: "12px",
                      marginBottom: "15px",
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{title}</h3>
                <p style={{ 
                  color: '#666', 
                  textAlign: 'center',
                  marginBottom: '15px',
                  minHeight: '40px'
                }}>{description}</p>
                <p style={{ 
                  fontWeight: "bold",
                  fontSize: '1.1rem',
                  color: '#52c41a'
                }}>{price} ZŁ</p>
                <div style={{ 
                  display: 'flex', 
                  gap: '5px',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}>
                  {category2?.map((cat, index) => (
                    <span key={index} style={{
                      background: '#f0f0f0',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.8rem'
                    }}>
                      {cat}
                    </span>
                  ))}
                </div>
              </StyledCard>
            </Col>
          ))}
        </Row>
      )}
    </PageContainer>
  );
};

export default Menu;
