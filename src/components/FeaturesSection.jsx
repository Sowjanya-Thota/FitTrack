import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from './ThemeContext';

// Import images
import workoutIcon from "../assets/Fit.webp"; 
import progressIcon from "../assets/fit9.png"; 
import mealPrepIcon from "../assets/fit11.png"; 
import bodyAnalysisIcon from "../assets/fit8.png"; 
import schedulerIcon from "../assets/fit10.png"; 
import lockIcon from "../assets/lock.png";

const FeaturesContainer = styled.section`
  padding: 60px 20px;
  background-color: var(--bg-color);
  border: 2px solid var(--border-color);
  color: var(--text-color);
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background-color: var(--bg-color);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid var(--border6-color);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  position: relative; /* Make the card a positioned element for the lock */
  cursor: pointer;

  &:hover {
    background-color: var(--border5-color);
    box-shadow: 0px 0px 15px rgba(77, 136, 255, 0.6); /* Glow effect */
    border-color: rgba(77, 136, 255, 1);
  }
`;

const Icon = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 15px;
`;

const LockIcon = styled.img`
  position: absolute;
  top: 10px; /* Adjust the position */
  right: 10px; /* Adjust the position */
  width: 40px;
  height: 40px;
  opacity: 0.8; /* Slight transparency */
  pointer-events: none; /* Prevent the lock from being clicked */
`;

const ComingSoonMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #333;
  color: #fff;
  padding: 20px 40px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
  text-align: center;
  font-size: 1.2rem;
  z-index: 1000;
`;

function FeaturesSection() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [showComingSoon, setShowComingSoon] = useState({ visible: false, feature: "" });

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleComingSoon = (featureName) => {
    setShowComingSoon({ visible: true, feature: featureName });
    setTimeout(() => setShowComingSoon({ visible: false, feature: "" }), 3000); // Hide message after 2 seconds
  };

  return (
    <FeaturesContainer id="features-section">
      <h2>Tools to Elevate Your Productivity</h2>
      <FeaturesGrid>
        {/* Customizable Workout Plans */}
        <FeatureCard onClick={() => handleNavigation('/custom-workout-plan')}>
          <Icon src={workoutIcon} alt="Workout Icon" />
          <h3>Customizable Workout Plans</h3>
          <p>
            Design workout routines tailored to your goals and preferences, with
            easy tracking and adjustments.
          </p>
        </FeatureCard>

        {/* Meal Prep Integration */}
        <FeatureCard onClick={() => handleNavigation('/meal-prep')}>
          <Icon src={mealPrepIcon} alt="Meal Prep Icon" />
          <h3>Meal Prep Integration</h3>
          <p>
            Plan your meals, log nutrition details, and ensure you’re meeting your
            dietary goals.
          </p>
        </FeatureCard>


         {/* Progress Tracking */}
         <FeatureCard onClick={() => handleNavigation('/progress-tracking')}>
          <Icon src={progressIcon} alt="Progress Icon" />
          <h3>Progress Tracking</h3>
          <p>
            Monitor your progress with real-time insights and updates on calories
            burned, steps taken, and more.
          </p>
        </FeatureCard>

        {/* Body Analysis Insights */}
        <FeatureCard onClick={() => handleComingSoon("Body Analysis Insights")}>
          <Icon src={bodyAnalysisIcon} alt="Body Analysis Icon" />
          <h3>Body Analysis Insights</h3>
          <p>
            Get insights into body metrics and track physical changes over time.
          </p>
          <LockIcon src={lockIcon} alt="Lock Icon" />
        </FeatureCard>

        {/* Smart Workout Scheduler */}
        <FeatureCard onClick={() => handleComingSoon("Smart Workout Scheduler")}>
          <Icon src={schedulerIcon} alt="Workout Scheduler Icon" />
          <h3>Smart Workout Scheduler</h3>
          <p>
            Easily schedule workouts and sync them with your calendar to stay on
            track.
          </p>
          <LockIcon src={lockIcon} alt="Lock Icon" />
        </FeatureCard>
      </FeaturesGrid>

      {showComingSoon.visible && (
        <ComingSoonMessage>
          ⚠️Coming Soon!⚠️ <br/> Stay Tuned..
        </ComingSoonMessage>
      )}
    </FeaturesContainer>
  );
}

export default FeaturesSection;
