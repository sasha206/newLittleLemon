import styled from 'styled-components';

const FooterWrapper = styled.div`
    background-color: #495E57;
    color: #EDEFEE;
    padding: 40px 20px;
    text-align: center;
    
    @media (max-width: 768px) {
        padding: 20px 10px;
    }
`;

const FooterContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
    align-items: start;
    padding: 0 20px;
`;

const FooterHeader = styled.h1`
    font-size: 28px;
    margin-bottom: 15px;
    color: #F4CE14;
    font-family: 'Markazi Text', serif;
`;

const FooterText = styled.p`
    font-size: 16px;
    margin: 8px 0;
    line-height: 1.6;
    color: #EDEFEE;
`;

// Remove NavLinks styled component as it's no longer needed

const SocialLinks = styled.div`
    display: flex;
    justify-content: center;
    gap: 25px;
    margin-top: 20px;

    a {
        color: white;
        text-decoration: none;
        transition: transform 0.3s;

        &:hover {
            transform: scale(1.1);
        }
    }

    img {
        width: 35px;
        height: 35px;
        filter: brightness(0) invert(1);
        transition: filter 0.3s;

        &:hover {
            filter: brightness(0) invert(0.9);
        }
    }
`;

const Footer = () => {
    return (
        <FooterWrapper>
            <FooterContent>
                <div>
                    <FooterHeader>Little Lemon</FooterHeader>
                    <FooterText>Located in Chicago on Lemon Street</FooterText>
                    <FooterText>Contact: (555) 123-4567</FooterText>
                </div>

                <div>
                    <FooterHeader>Connect With Us</FooterHeader>
                    <SocialLinks>
                        <a href="https://www.facebook.com" aria-label="Facebook">
                            <img src="/Facebook_Logo_Secondary.png" alt="Facebook" />
                        </a>
                        <a href="https://www.twitter.com" aria-label="Twitter">
                            <img src="/logo-white.png" alt="Twitter" />
                        </a>
                        <a href="https://www.instagram.com" aria-label="Instagram">
                            <img src="/Instagram_Glyph_White.png" alt="Instagram" />
                        </a>
                    </SocialLinks>
                    <FooterText>&copy; 2024 Little Lemon Restaurant</FooterText>
                </div>
            </FooterContent>
        </FooterWrapper>
    );
};

export default Footer;
