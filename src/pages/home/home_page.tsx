// src/pages/home/home_page.tsx
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from "./home_components/Header_Home";
import WeekSpecials from "./home_components/week_Specials";
import OurStory from "./home_components/our_story";

const PageContainer = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  
  &.loaded {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SectionDivider = styled.div`
  height: 60px;
`;

const Home = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        // Trigger animation after component mounts
        setIsLoaded(true);
    }, []);

    return(
        <PageContainer className={isLoaded ? 'loaded' : ''}>
            <Header/>
            <SectionDivider />
            <WeekSpecials/>
            <SectionDivider />
            <OurStory/>
            <SectionDivider />
        </PageContainer>
    );
};

export default Home;