import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom"; // For navigation
import { scroller } from "react-scroll"; // For smooth scrolling within the same page

const FooterContainer = styled.footer`
  background-color: var(--bg-color); /* Theme-based background color */
  color: var(--text-color); /* Theme-based text color */
  padding: 40px 20px;
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const FooterContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Logo = styled.h2`
  font-size: 1.5em;
  color: var(--text-color); /* Theme-based logo color */
`;

const Links = styled.div`
  display: flex;
  gap: 15px;
`;

const FooterLink = styled.button`
  background: none;
  border: none;
  color: var(--text-color); /* Theme-based link color */
  font-size: 0.9em;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    color: var(--primary-color); /* Theme-based hover color */
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 10px;
  font-size: 1.2em;
`;

const SocialIcon = styled.a`
  color: var(--text-color); /* Theme-based social icon color */
  text-decoration: none;
  &:hover {
    color: var(--primary-color); /* Theme-based hover color */
  }
`;

const Copyright = styled.p`
  font-size: 0.8em;
  color: var(--subtext-color); /* Theme-based copyright color */
  margin-top: 20px;
`;

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToSection = (section) => {
    if (location.pathname === "/") {
      // Scroll to section if already on the Home page
      scroller.scrollTo(section, {
        smooth: true,
        duration: 500,
        offset: -70, // Adjust if the navbar covers part of the section
      });
    } else {
      // Navigate to Home and scroll after navigation
      navigate("/", { state: { scrollTo: section } });
    }
  };

  const handleContactClick = () => {
    // Open the user's email client
    window.location.href = "mailto:tejashtarunofficial@gmail.com";
  };

  return (
    <FooterContainer>
      <FooterContent>
        <Logo>FitTrack</Logo>
        <Links>
          <FooterLink onClick={() => handleScrollToSection("features-section")}>
            Features
          </FooterLink>
          <FooterLink onClick={() => handleScrollToSection("pricing-section")}>
            Pricing
          </FooterLink>
          <FooterLink onClick={() => handleScrollToSection("faq-section")}>
            FAQ
          </FooterLink>
          <FooterLink onClick={handleContactClick}>Contact</FooterLink>
        </Links>
        <SocialIcons>
          <SocialIcon
            href="https://github.com/tejash05"
            target="_blank"
            rel="noopener noreferrer"
          >
            📘
          </SocialIcon>
          <SocialIcon
            href="https://www.linkedin.com/in/tejashtarunofficial/"
            target="_blank"
            rel="noopener noreferrer"
          >
            🐦
          </SocialIcon>
          <SocialIcon
            href="https://www.instagram.com/_yashdeol_?igsh=bWlsa3ByOHEzanVu"
            target="_blank"
            rel="noopener noreferrer"
          >
            📷
          </SocialIcon>
        </SocialIcons>
        <Copyright>© 2023 AKTIVATE. All rights reserved.</Copyright>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;
