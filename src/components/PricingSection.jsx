// src/components/PricingSection.jsx
import React from 'react';
import styled from 'styled-components';
import { useTheme } from './ThemeContext'; // Import theme context

const PricingContainer = styled.section`
  padding: 60px 20px;
  background-color: var(--bg-color);  // Use theme background color
  color: var(--text-color);           // Use theme text color
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const SectionTitle = styled.h2`
  font-size: 2em;
  color: var(--text-color);           // Use theme text color
  margin-bottom: 40px;
  font-weight: bold;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const PricingCard = styled.div`
  background-color: var(--card-bg-color);  // Use theme card background color
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: background-color 0.3s ease;
    border: 2px solid var(--border-color); 

`;

const PlanName = styled.h3`
  font-size: 1.5em;
  color: #007bff;                      // Primary color for plan names
  margin-bottom: 10px;
`;

const PlanPrice = styled.p`
  font-size: 1.2em;
  color: var(--text-color);            // Use theme text color
  font-weight: bold;
  margin: 10px 0;
`;

const PlanDescription = styled.p`
  font-size: 1em;
  color: var(--subtext-color);         // Use theme subtext color
  margin-bottom: 20px;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  font-size: 0.9em;
  color: var(--subtext-color);         // Use theme subtext color
  margin-bottom: 20px;
`;

const FeatureItem = styled.li`
  margin: 5px 0;
`;

const GetStartedButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

function PricingSection() {
  const { theme } = useTheme(); // Get current theme

  return (
    <PricingContainer id="pricing-section">
      <SectionTitle>Plans That Fit Your Fitness Journey</SectionTitle>
      <PricingGrid>
        <PricingCard>
          <PlanName>Basic</PlanName>
          <PlanPrice>$29</PlanPrice>
          <PlanDescription>For individuals just starting their fitness journey.</PlanDescription>
          <FeaturesList>
            <FeatureItem>Access to workout tracking</FeatureItem>
            <FeatureItem>Basic progress insights</FeatureItem>
            <FeatureItem>Limited goals and milestones</FeatureItem>
          </FeaturesList>
          <GetStartedButton>Get Started</GetStartedButton>
        </PricingCard>

        <PricingCard>
          <PlanName>Pro</PlanName>
          <PlanPrice>$69</PlanPrice>
          <PlanDescription>For fitness enthusiasts with advanced tracking needs.</PlanDescription>
          <FeaturesList>
            <FeatureItem>All basic features</FeatureItem>
            <FeatureItem>Customizable workout plans</FeatureItem>
            <FeatureItem>Meal prep integration</FeatureItem>
          </FeaturesList>
          <GetStartedButton>Get Started</GetStartedButton>
        </PricingCard>

        <PricingCard>
          <PlanName>Enterprise</PlanName>
          <PlanPrice>$99</PlanPrice>
          <PlanDescription>For teams and organizations managing multiple users.</PlanDescription>
          <FeaturesList>
            <FeatureItem>All pro features</FeatureItem>
            <FeatureItem>Dedicated account support</FeatureItem>
            <FeatureItem>Group management</FeatureItem>
          </FeaturesList>
          <GetStartedButton>Get Started</GetStartedButton>
        </PricingCard>
      </PricingGrid>
    </PricingContainer>
  );
}

export default PricingSection;
