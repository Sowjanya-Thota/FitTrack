import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { scroller } from "react-scroll";
import { useTheme } from "./ThemeContext";
import darkModeIcon from "../assets/Halfmoon.jpg";
import lightModeIcon from "../assets/Sun7.png";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: var(--bg-color);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  font-size: 1.5em;
  color: var(--text-color);
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: var(--text-color);
  font-size: 1em;
  &:hover {
    color: #007bff;
  }
`;

const ScrollButton = styled.button`
  background: none;
  border: none;
  text-decoration: none;
  color: var(--text-color);
  font-size: 1em;
  cursor: pointer;
  &:hover {
    color: #007bff;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
`;

const DemoButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ToggleButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  font-size: 1em;
  padding: 10px;
`;

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToSection = (section) => {
    if (location.pathname === "/") {
      // Scroll to section if already on the Home page
      scroller.scrollTo(section, {
        smooth: true,
        duration: 500,
        offset: -70, // Adjust for navbar height
      });
    } else {
      // Navigate to Home and scroll after navigation
      navigate("/", { state: { scrollTo: section } });
    }
  };

  const handleDemoClick = () => {
    // Navigate directly to the Customizable Workout Plan page
    navigate("/custom-workout-plan");
  };

  return (
    <NavbarContainer>
      <Logo>FitTrack</Logo>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <ScrollButton onClick={() => handleScrollToSection("features-section")}>
          Features
        </ScrollButton>
        <ScrollButton onClick={() => handleScrollToSection("pricing-section")}>
          Pricing
        </ScrollButton>
        <ScrollButton onClick={() => handleScrollToSection("faq-section")}>
          FAQ
        </ScrollButton>
      </NavLinks>
      <ActionButtons>
        {/* Book a Demo navigates to Custom Workout Plan */}
        <DemoButton onClick={handleDemoClick}>Book a Demo</DemoButton>
        <ToggleButton onClick={toggleTheme}>
          <img
            src={theme === "light" ? darkModeIcon : lightModeIcon}
            alt={theme === "light" ? "Dark Mode Icon" : "Light Mode Icon"}
            style={{ width: "50px", height: "45px", marginRight: "8px" }}
          />
        </ToggleButton>
      </ActionButtons>
    </NavbarContainer>
  );
}

export default Navbar;
