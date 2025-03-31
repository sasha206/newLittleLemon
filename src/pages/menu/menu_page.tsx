import { useState, useEffect, useMemo } from "react"; // Import useMemo
import styled from "styled-components";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
// Import necessary Ant Design components
import { Card, Row, Col, Checkbox, Radio, Spin, Button, Typography, Space, Tag, Alert } from "antd";
import outputs from "../../../amplify_outputs.json";
import type { Schema } from "../../../amplify/data/resource";
import { StorageImage } from "@aws-amplify/ui-react-storage";

Amplify.configure(outputs);
const client = generateClient<Schema>();

// --- Styled Components (Minor Refinements) ---

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 30px auto; // Increased top/bottom margin
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
    margin: 15px auto;
  }
`;

const FilterSection = styled.div`
  background: #ffffff; // Use white background for filters
  padding: 25px; // Slightly more padding
  border-radius: 16px; // More rounded corners
  margin-bottom: 40px; // Increased spacing
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); // Softer shadow

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

// Use Ant Design Typography for titles
const { Title, Text } = Typography;

const CategoryTitle = styled(Title).attrs({ level: 4 })` // Use Antd Title
  margin-bottom: 15px !important; // Override default margin
  color: #444; // Slightly softer title color
`;

const MenuTitle = styled(Title).attrs({ level: 1 })` // Use Antd Title
  text-align: center;
  margin-bottom: 40px !important; // Increased spacing
  color: #333;
`;

const StyledCard = styled(Card)<{ $highlight?: boolean }>` // Use transient prop
  border-radius: 16px; // Match filter section rounding
  transition: all 0.3s ease;
  overflow: hidden; // Ensure content respects border-radius
  border: 1px solid #e8e8e8; // Default border

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }

  .ant-card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center; // Center text content
    padding: 20px;
  }

  // Enhanced highlight style
  ${(props) =>
    props.$highlight &&
    `
    border: 2px solid #F4CE14; // Use Little Lemon yellow for highlight
    box-shadow: 0 0 15px rgba(244, 206, 20, 0.3);
    transform: scale(1.03);
    `}

  .card-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 10px; // Add space above title
    margin-bottom: 8px;
    color: #333;
  }

  .card-description {
    color: #666;
    margin-bottom: 15px;
    min-height: 45px; // Ensure consistent space for description
    font-size: 0.9rem;
  }

  .card-price {
    font-weight: bold;
    font-size: 1.15rem;
    color: #495E57; // Little Lemon primary green for price
    margin-bottom: 15px;
  }

  .card-tags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: center;
    min-height: 24px; // Reserve space for tags
  }
`;

// --- Menu Component ---

const Menu = () => {
  // --- State ---
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState<Schema["ItemMenu"]["type"][]>([]);
  const [menuCategories1, setMenuCategories1] = useState<Schema["Category1"]["type"][]>([]);
  const [menuCategories2, setMenuCategories2] = useState<Schema["Category2"]["type"][]>([]);
  const [selectedCategory1, setSelectedCategory1] = useState<string>("");
  const [selectedCategory2, setSelectedCategory2] = useState<string[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null); // State for fetch errors

  // --- Data Fetching ---
  const fetchMenuData = async () => {
    try {
      setLoading(true);
      setFetchError(null); // Reset error on new fetch

      // Fetch all data concurrently
      const [itemsResult, cat1Result, cat2Result] = await Promise.all([
        client.models.ItemMenu.list({ authMode: 'apiKey' }),
        client.models.Category1.list({ authMode: 'apiKey' }),
        client.models.Category2.list({ authMode: 'apiKey' }),
      ]);

      // Basic validation - check for errors in results if the API provides them
      if (itemsResult.errors) throw new Error('Failed to fetch menu items.');
      if (cat1Result.errors) throw new Error('Failed to fetch main categories.');
      if (cat2Result.errors) throw new Error('Failed to fetch sub categories.');

      setMenuItems(itemsResult.data);
      setMenuCategories1(cat1Result.data);
      setMenuCategories2(cat2Result.data);

    } catch (error: any) {
      console.error("Error fetching menu data:", error);
      setFetchError(error.message || "An unknown error occurred while fetching the menu.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchMenuData();
  }, []);

  // --- Filtering Logic ---
  const filteredMenuItems = useMemo(() => {
    // Start with all items
    let items = menuItems;

    // Filter by Main Category (Category 1)
    if (selectedCategory1) {
      items = items.filter(item => item.category1 === selectedCategory1);
    }

    // Filter by Dietary Preferences (Category 2)
    // Item must have ALL selected dietary preferences
    if (selectedCategory2.length > 0) {
      items = items.filter(item => {
        // Ensure item.category2 is an array and not null/undefined
        const itemCats = Array.isArray(item.category2) ? item.category2 : [];
        // Check if every selected category is present in the item's categories
        return selectedCategory2.every(selCat => itemCats.includes(selCat));
      });
    }

    return items;
  }, [menuItems, selectedCategory1, selectedCategory2]); // Recalculate only when these change

  // --- Event Handlers ---
  const handleMainCategoryChange = (e: any) => {
    setSelectedCategory1(e.target.value);
  };

  const handleDietaryChange = (checkedValues: any[]) => { // Antd Checkbox.Group passes any[]
    // Ensure values are strings before setting state
    setSelectedCategory2(checkedValues.map(String));
  };

  const resetFilters = () => {
    setSelectedCategory1('');
    setSelectedCategory2([]);
  };

  // --- Render Logic ---

  const renderContent = () => {
    if (loading) {
      return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" tip="Loading Menu..." />
        </div>
      );
    }

    if (fetchError) {
        return (
            <Alert
                message="Error Loading Menu"
                description={fetchError}
                type="error"
                showIcon
                style={{ margin: '20px 0' }}
            />
        );
    }

    if (filteredMenuItems.length === 0) {
      return (
        <div style={{ textAlign: "center", padding: '40px', background: '#fafafa', borderRadius: '12px', marginTop: '30px' }}>
          <Title level={4}>No Matching Items Found</Title>
          <Text type="secondary">Try adjusting your filters or view all items.</Text>
          <br />
          <Button type="link" onClick={resetFilters} style={{marginTop: '10px'}}>
            Reset Filters
          </Button>
        </div>
      );
    }

    return (
      <Row gutter={[24, 24]}> {/* Increased gutter */}
        {filteredMenuItems.map(({ id, title, description, image, price, category2 }) => (
          <Col key={id} xs={24} sm={12} md={8} lg={6}>
            <StyledCard
              hoverable
              // Highlight if *any* selected dietary preference matches the item's tags
              // This provides feedback even if the 'every' filter is strict
              $highlight={Array.isArray(category2) && category2.some(cat => cat && selectedCategory2.includes(cat))}
              bordered={false} // Use shadow for separation instead of border
              style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)' }} // Consistent base shadow
            >
              {image ? (
                <StorageImage
                  alt={title || 'Menu item'}
                  path={`${image}`} // Assuming image key is correct path
                  style={{
                    borderRadius: "12px", // Match card rounding
                    marginBottom: "15px",
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                  // Add fallback UI within StorageImage if supported, or handle error state
                />
              ) : (
                 // Placeholder if no image
                 <div style={{ height: '200px', width: '100%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', marginBottom: '15px', color: '#bbb' }}>
                    No Image Available
                </div>
              )}
              <Title level={5} className="card-title">{title}</Title>
              <Text className="card-description">{description}</Text>
              <Text className="card-price">{price ? `${price} ZŁ` : 'Price not available'}</Text>
               {/* Display Category 2 Tags */}
              <div className="card-tags">
                {Array.isArray(category2) && category2.map((cat, index) => (
                   cat && <Tag key={index} color="default">{cat}</Tag> // Use Antd Tags
                ))}
              </div>
            </StyledCard>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <PageContainer>
      {/* Filter Section */}
      <FilterSection>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* Reset Button Row */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <Button onClick={resetFilters} disabled={!selectedCategory1 && selectedCategory2.length === 0}>
                    Reset Filters
                </Button>
            </div>

          {/* Main Categories Filter */}
          <div>
            <CategoryTitle>Main Course Type</CategoryTitle>
            <Radio.Group
              options={menuCategories1
                // Filter out categories without a valid name BEFORE mapping
                .filter(category => category.categoryName1)
                .map(category => ({
                  label: category.categoryName1, // No need for 'as string' if filtered
                  value: category.categoryName1,
                }))}
              value={selectedCategory1}
              onChange={handleMainCategoryChange}
              optionType="button"
              buttonStyle="solid" // Keep solid style
              style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }} // Add gap for spacing
            />
          </div>

          {/* Dietary Preferences Filter */}
          <div>
            <CategoryTitle>Dietary Preferences</CategoryTitle>
            <Checkbox.Group
              style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }} // Use gap for spacing
              options={menuCategories2
                .filter(category => category.categoryName2)
                .map(category => ({
                  label: category.categoryName2,
                  value: category.categoryName2,
                }))}
              value={selectedCategory2}
              onChange={handleDietaryChange}
            />
          </div>
        </Space>
      </FilterSection>

      {/* Menu Display Section */}
      <MenuTitle>Our Menu</MenuTitle>
      {renderContent()}
    </PageContainer>
  );
};

export default Menu;