import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import backgroundImage from "../assets/FIt3.jpg";

const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  text-align: center;
  min-height: 50vh;
  border: 4px solid var(--border-color);
`;

const Heading = styled.h1`
  font-size: 2.5em;
  color: #fff;
  margin-bottom: 20px;
  font-weight: bold;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
`;

const SubHeading = styled.p`
  font-size: 1.2em;
  color: #eee;
  max-width: 600px;
  margin-bottom: 40px;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const DemoButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  &:hover {
    background-color: #0056b3;
  }
`;

const ContactButton = styled.a` /* Changed to an anchor tag */
  background-color: transparent;
  color: #007bff;
  border: 2px solid #007bff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  text-decoration: none; /* Remove underline */
  &:hover {
    background-color: #e6f0ff;
  }
`;

function HeroSection() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleDemoClick = () => {
    navigate("/custom-workout-plan"); // Navigate to the Customizable Workout Plan page
  };

  return (
    <HeroContainer>
      <Heading>Your Health, Simplified</Heading>
      <SubHeading>
        Track your workouts, meals, and more with our all-in-one dashboard. Stay
        motivated and achieve your fitness goals effortlessly.
      </SubHeading>
      <ButtonGroup>
        <DemoButton onClick={handleDemoClick}>Book a Demo</DemoButton>
        <ContactButton href="mailto:tejashtarunofficial@gmail.com">
          Contact Sales
        </ContactButton>
      </ButtonGroup>
    </HeroContainer>
  );
}

export default HeroSection;
