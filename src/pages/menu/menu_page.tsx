import { useState, useEffect } from "react";
import styled from "styled-components";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { Card, Row, Col } from "antd";
import outputs from "../../../amplify_outputs.json";
import type { Schema } from "../../../amplify/data/resource";
import { StorageImage } from "@aws-amplify/ui-react-storage";

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkedId = e.target.value;
    if (e.target.checked) {
      setSelectedCategory2([...selectedCategory2, checkedId]);
    } else {
      setSelectedCategory2(selectedCategory2.filter((id) => id !== checkedId));
    }
    console.log(selectedCategory2);
  };

  return (
    <PageContainer>
      <div>
        <button onClick={() => setSelectedCategory1('')}>Clear</button>
        <input
          type="radio"
          id="category1-all"
          name="category1"
          value=""
          checked={selectedCategory1 === null}
          onChange={() => setSelectedCategory1('')}
        />
        <label htmlFor="category1-all">All</label>
      </div>
      <form>
        <fieldset>
          <legend>Please select your preferred category1:</legend>
          {menuCategories1.map((category) => (
            <div key={category.id}>
              <input
                type="radio"
                id={`${category.id}`}
                name="category1"
                value={`${category.categoryName1}`}
                onChange={(e) => setSelectedCategory1(e.target.value)}
              />
              <label htmlFor={`${category.id}`}>{`${category.categoryName1}`}</label>
            </div>
          ))}
        </fieldset>
      </form>
      <form>
        <fieldset>
          <legend>Please select your preferred category2:</legend>
          {menuCategories2.map((category) => (
            <div key={category.id}>
              <input
                type="checkbox"
                id={`${category.id}`}
                name="category2"
                value={`${category.categoryName2}`}
                onChange={(e) => handleCheckboxChange(e)}
              />
              <label htmlFor={`${category.id}`}>{category.categoryName2}</label>
            </div>
          ))}
        </fieldset>
      </form>

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
                <p style={{ fontWeight: "bold" }}>{price} USD</p>
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
