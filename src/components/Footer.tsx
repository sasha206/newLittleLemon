import { useState } from 'react';

import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #495E57;
  color: #EDEFEE;
  padding: 60px 24px;
`;

const FooterWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;




const FooterTitle = styled.h3`
  color: #F4CE14;
  font-family: 'Markazi Text', serif;
  font-size: 24px;
  margin: 0 0 16px 0;
  font-weight: 500;
`;

const FooterText = styled.p`
  margin: 0 0 12px 0;
  font-size: 15px;
  color: #EDEFEE;
  line-height: 1.6;
`;


const AddressItem = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
  align-items: flex-start;
`;

const Icon = styled.span`
  color: #F4CE14;
  font-size: 18px;
  line-height: 1.5;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`;

const SocialIcon = styled.a`
  color: #EDEFEE;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #F4CE14;
    color: #495E57;
    transform: translateY(-3px);
  }
`;

const NewsletterForm = styled.form`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const EmailInput = styled.input`
  padding: 12px 16px;
  border-radius: 8px 0 0 8px;
  border: none;
  flex: 1;
  font-size: 14px;
  outline: none;
`;

const SubscribeButton = styled.button`
  background-color: #F4CE14;
  color: #333333;
  border: none;
  padding: 12px 16px;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #E4BE04;
  }
`;

const Divider = styled.div`
  margin: 40px 0 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const BottomBar = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 14px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 24px;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }
`;

const LegalLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.2s ease;
  font-size: 14px;
  
  &:hover {
    color: #F4CE14;
  }
`;

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <FooterContainer>
      <FooterWrapper>
        <Column>
          <FooterText>
            Little Lemon is a charming neighborhood bistro that serves simple food and classic cocktails in a lively but casual environment.
          </FooterText>
          <SocialLinks>
            <SocialIcon href="https://facebook.com" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </SocialIcon>
            <SocialIcon href="https://instagram.com" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </SocialIcon>
            <SocialIcon href="https://twitter.com" aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </SocialIcon>
            <SocialIcon href="https://youtube.com" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </SocialIcon>
          </SocialLinks>
        </Column>
        
        <Column>
          <FooterTitle>Contact Us</FooterTitle>
          <AddressItem>
            <Icon>📍</Icon>
            <FooterText>123 Lemon Street, Chicago, IL 60601</FooterText>
          </AddressItem>
          <AddressItem>
            <Icon>📞</Icon>
            <FooterText>(555) 123-4567</FooterText>
          </AddressItem>
          <AddressItem>
            <Icon>✉️</Icon>
            <FooterText>hello@littlelemon.com</FooterText>
          </AddressItem>
          <AddressItem>
            <Icon>🕒</Icon>
            <FooterText>
              Mon-Thu: 11am-9pm<br />
              Fri-Sun: 11am-10pm
            </FooterText>
          </AddressItem>
        </Column>
        

        <Column>
          <FooterTitle>Newsletter</FooterTitle>
          <FooterText>Subscribe to our newsletter to get the latest updates on special offers and events.</FooterText>
          <NewsletterForm onSubmit={handleSubmit}>
            <InputWrapper>
              <EmailInput
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address"
              />
              <SubscribeButton type="submit">Subscribe</SubscribeButton>
            </InputWrapper>
          </NewsletterForm>
        </Column>
      </FooterWrapper>
      
      <Divider />
      
      <BottomBar>
        <Copyright>&copy; {new Date().getFullYear()} Little Lemon Restaurant. All rights reserved.</Copyright>
        <LegalLinks>
          <LegalLink href="/terms">Terms of Service</LegalLink>
          <LegalLink href="/privacy">Privacy Policy</LegalLink>
          <LegalLink href="/cookies">Cookies Policy</LegalLink>
        </LegalLinks>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;