import { useState, useEffect } from "react";
import styled from "styled-components";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { Card, Row, Col } from "antd";
import outputs from "../../../amplify_outputs.json";
import type { Schema } from "../../../amplify/data/resource";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import { Checkbox } from 'antd';
import { Radio } from 'antd';

Amplify.configure(outputs);
const client = generateClient<Schema>();

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
`;

const MenuTitle = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5rem;
`;

const StyledCard = styled(Card)<{ highlight?: boolean }>`
  margin: 10px;
  border-radius: 10px;
  
  .ant-card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  ${(props) =>
    props.highlight &&
    `
    border: 2px solid red;
    background-color: #ffe6e6;
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
    flex: 1 0 calc(33.33% - 10px); 
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

const Menu = () => {
  const [menuItems, setMenuItems] = useState<Schema["ItemMenu"]["type"][]>([]);
  const [menuCategories1, setMenuCategories1] = useState<Schema["Category1"]["type"][]>([]);
  const [menuCategories2, setMenuCategories2] = useState<Schema["Category2"]["type"][]>([]);
  const [selectedCategory1, setSelectedCategory1] = useState<string>("");
  const [selectedCategory2, setSelectedCategory2] = useState<string[]>([]);

  const fetchMenu = async () => {
    try {
      const { data: items } = await client.models.ItemMenu.list();
      setMenuItems(items);
      const { data: items1 } = await client.models.Category1.list();
      setMenuCategories1(items1);
      const { data: items2 } = await client.models.Category2.list();
      setMenuCategories2(items2);
    } catch (error) {
      console.error("Error fetching menu items:", error);
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
      <div>
        <button onClick={() => setSelectedCategory1('')}>Clear</button>
      </div>
      <Flex vertical gap="middle">
      <StyledRadioGroup
        options={menuCategories1
          .filter((category) => category.categoryName1 !== null && category.categoryName1 !== undefined)
          .map((category) => ({
            label: category.categoryName1 as string,
            value: category.categoryName1 as string,
          }))}
        optionType="button"
        buttonStyle="solid"
      />
    </Flex>
      <div>
      <h3>Please select your preferred category2:</h3>
      <Checkbox.Group
  options={menuCategories2
    .filter((category) => category.categoryName2 !== null && category.categoryName2 !== undefined)
    .map((category) => ({
      label: category.categoryName2 as string,
      value: category.categoryName2 as string,
    }))} 
  value={selectedCategory2}
  onChange={handleCheckboxChange}
/>

    </div>

      <MenuTitle>Our Menu</MenuTitle>
      {menuItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>No items available in the menu.</p>
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
                    alt="none"
                    path={`${image}`}
                    style={{
                      borderRadius: "10px",
                      marginBottom: "10px",
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <h3>{title}</h3>
                <p>{description}</p>
                <p style={{ fontWeight: "bold" }}>{price} ZŁ</p>
                <p>{category1}</p>
                <p>{category2}</p>
              </StyledCard>
            </Col>
          ))}
        </Row>
      )}
    </PageContainer>
  );
};

export default Menu;
