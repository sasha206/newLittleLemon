import styled from 'styled-components';

const FooterWrapper = styled.div`
    background-color: #ADB6C4;
    color: white;
    padding: 20px;
    text-align: center;
`;

const FooterHeader = styled.h1`
    font-size: 24px;
    margin-bottom: 10px;
`;

const FooterText = styled.p`
    font-size: 16px;
    margin: 5px 0;
`;

const ContainerSocialLinks = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
`
const SocialLinks = styled.div`

    display: flex;
    justify-content: center;
    gap: 35px;

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
        width: 40px;
        height: 40px;
    }
`;


const Footer = () => {
    return (
        <FooterWrapper>
            <footer>
                <FooterHeader>Little Lemon</FooterHeader>
                <FooterText>Located in Chicago on Lemon Street</FooterText>
                <FooterText>&copy; 2024 Little Lemon Restaurant. All rights reserved.</FooterText>
                <ContainerSocialLinks>
                <SocialLinks>
                    <a href="https://www.facebook.com">
                        <img src="/Facebook_Logo_Secondary.png" alt="Facebook" />
                    </a>
                    <a href="https://www.twitter.com">
                        <img src="/logo-white.png" alt="Twitter" />
                    </a>
                    <a href="https://www.instagram.com">
                        <img src="/Instagram_Glyph_White.png" alt="Instagram" />
                    </a>
                </SocialLinks>
                </ContainerSocialLinks>

            </footer>
        </FooterWrapper>
    );
};

export default Footer;
