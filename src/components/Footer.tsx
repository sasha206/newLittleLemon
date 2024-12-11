import styled from 'styled-components';

const FooterWrapper = styled.div`
    background-color: #ADB6C4;
    color: white;
    padding: 20px;
    text-align: right;
`;

const FooterHeader = styled.h1`
    font-size: 24px;
    margin-bottom: 10px;
`;

const FooterText = styled.p`
    font-size: 16px;
    margin: 5px 0;
`;

const SocialLinks = styled.div`
    margin-top: 15px;
    display: flex;
    justify-content: right;
    gap: 15px;

    a {
        color: white;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 5px;
        transition: color 0.3s;

        &:hover {
            color: #d4edda;
        }
    }

    img {
        width: 20px;
        height: 20px;
    }
`;

const Footer = () => {
    return (
        <FooterWrapper>
            <footer>
                <FooterHeader>Little Lemon</FooterHeader>
                <FooterText>Located in Chicago on Lemon Street</FooterText>
                <FooterText>&copy; 2024 Little Lemon Restaurant. All rights reserved.</FooterText>
                <SocialLinks>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src="/facebook-logo.png" alt="Facebook" /> Facebook
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src="/twitter-logo.png" alt="Twitter" /> Twitter
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="/instagram-logo.png" alt="Instagram" /> Instagram
                    </a>
                </SocialLinks>
            </footer>
        </FooterWrapper>
    );
};

export default Footer;
