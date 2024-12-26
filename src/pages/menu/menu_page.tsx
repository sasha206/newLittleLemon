import { useState, useEffect } from "react";
import styled from "styled-components";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { Card, Row, Col } from "antd";
import outputs from "../../../amplify_outputs.json";
import type { Schema } from "../../../amplify/data/resource";

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

const Menu = () => {
  const [menuItems, setMenuItems] = useState<Schema["ItemMenu"]["type"][]>([]);

  const fetchMenuItems = async () => {
    try {
      const { data: items } = await client.models.ItemMenu.list();
      setMenuItems(items);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <PageContainer>
      <MenuTitle>Our Menu</MenuTitle>
      {menuItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>No items available in the menu.</p>
      ) : (
        <Row gutter={[16, 16]}>
          {menuItems.map(({ id, title, description, image, price }) => (
            <Col key={id} xs={24} sm={12} md={8} lg={6}>
              <StyledCard hoverable>
                {image && <img src={image} />}
                <h3>{title}</h3>
                <p>{description}</p>
                <p style={{ fontWeight: "bold" }}>{price} USD</p>
              </StyledCard>
            </Col>
          ))}
        </Row>
      )}
    </PageContainer>
  );
};

export default Menu;
