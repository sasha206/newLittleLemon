import '@aws-amplify/ui-react/styles.css';
import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
import { Authenticator } from '@aws-amplify/ui-react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { useState, useEffect } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';
import styled from 'styled-components';

// Configure Amplify
Amplify.configure(outputs);

// Styled Components
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const ProfileCard = styled.div`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  padding: 32px;
  width: 100%;
  max-width: 480px;
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  @media (max-width: 576px) {
    padding: 24px 16px;
    max-width: 90%;
  }
`;

const WelcomeHeader = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 24px;
  
  @media (max-width: 576px) {
    font-size: 24px;
  }
`;

const ProfileSection = styled.div`
  margin-bottom: 24px;
`;

const ProfileLabel = styled.div`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 4px;
  text-align: left;
`;

const ProfileValue = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #111827;
  padding: 12px 16px;
  background-color: #f3f4f6;
  border-radius: 8px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const GroupBadge = styled.span`
  display: inline-block;
  background-color: #4f46e5;
  color: white;
  font-size: 14px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 9999px;
  margin: 4px;
`;

const GroupContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
`;

const SignOutButton = styled.button`
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 16px;
  
  &:hover {
    background-color: #4338ca;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
  }
`;

const LoadingIndicator = styled.div`
  color: #6b7280;
  font-style: italic;
`;

const Login = () => {
  const [name, setName] = useState<string | undefined>();
  const [group, setGroup] = useState<string[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAttributesAndSetName() {
      try {
        setIsLoading(true);
        const userAttributes = await fetchUserAttributes();
        const preferredName = userAttributes["preferred_username"];
        setName(preferredName);
        
        const { tokens } = await fetchAuthSession();
        const groups = tokens?.accessToken.payload["cognito:groups"] as string[];
        if (Array.isArray(groups)) {
          setGroup(groups);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchAttributesAndSetName();
  }, []);

  const renderGroupBadges = () => {
    if (!group || group.length === 0) {
      return <ProfileValue>No groups assigned</ProfileValue>;
    }
    
    return (
      <GroupContainer>
        {group.map((g, index) => (
          <GroupBadge key={index}>{g}</GroupBadge>
        ))}
      </GroupContainer>
    );
  };

  return (
    <PageContainer>
      <Authenticator>
        {({ signOut, user }) => (
          <ProfileCard>
            <WelcomeHeader>
              {isLoading ? "Loading profile..." : `Welcome, ${name || user?.username || "User"}`}
            </WelcomeHeader>
            
            {isLoading ? (
              <LoadingIndicator>Loading your profile information...</LoadingIndicator>
            ) : (
              <>
                <ProfileSection>
                  <ProfileLabel>Your id</ProfileLabel>
                  <ProfileValue>{user?.username}</ProfileValue>
                </ProfileSection>
                
                <ProfileSection>
                  <ProfileLabel>Access Groups</ProfileLabel>
                  {renderGroupBadges()}
                </ProfileSection>
                
                <SignOutButton onClick={signOut}>Sign Out</SignOutButton>
              </>
            )}
          </ProfileCard>
        )}
      </Authenticator>
    </PageContainer>
  );
};

export default Login;