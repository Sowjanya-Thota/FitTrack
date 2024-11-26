import React, { useState, useEffect } from 'react';
import UserDetailsForm from '../components/UserDetailsForm';
import ProgressBar from '../components/ProgressBar';
import styled from 'styled-components';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

// Styled Components
const PageContainer = styled.div`
  display: flex;
  padding: 20px;
  background-color: var(--bg-color);
  color: var(--text-color);
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;
  min-height: 70vh;
`;

const Sidebar = styled.div`
  flex: 0 0 250px;
  background-color: var(--bg-color);
  color: var(--text-color);
  text-align: center;
  border: 2px solid var(--border-color);
  padding: 20px;
  height: auto;
  min-height: 100%;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const UserInfo = styled.div`
  padding: 15px;
  border-radius: 8px;
  background-color: var(--border5-color);
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 15px;
  height: 95%;
  display: flex;
  flex-direction: column;
  gap: 15px; /* Adds space between each item */
  font-family: 'Arial', sans-serif; /* Professional font style */
`;

const UserDetail = styled.p`
  margin: 0;
  font-size: 1em; /* Adjust as needed for readability */
  font-weight: 400; /* Normal text weight */
  color: var(--text-color); /* Theme-based color */
  display: flex;
  justify-content: space-between; /* Align label and value */
  gap: 10px;
`;

const UserDetailLabel = styled.span`
  font-weight: bold;
  font-size: 1.1em; /* Slightly larger label for emphasis */
  color: var(--primary-color); /* Theme primary color for labels */
`;
const EditButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  &:hover {
    color: #0056b3;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NutrientCards = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const Card = styled.div`
  flex: 1;
  background-color: var(--bg-color);
  border: 2px solid var(--border-color);
  border-radius: 10px;
  padding: 20px;
  margin: 0 10px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
    background-color: var(--border2-color);
  }
`;

const Icon = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
`;

const ChartContainer = styled.div`
  width: 90%;
  margin-top: 20px;
  border: 2px solid var(--border-color);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
`;

// Helper Function: Calculate Total Nutrient Intake
const calculateTotalIntake = (intake) => {
  return (
    parseFloat(intake.morning || 0) +
    parseFloat(intake.afternoon || 0) +
    parseFloat(intake.evening || 0)
  );
};

function MealPrepPage() {
  const [userDetails, setUserDetails] = useState(null);
  const [recommended, setRecommended] = useState({ protein: 0, carbs: 0, fats: 0 });
  const [selectedNutrient, setSelectedNutrient] = useState(null);

  useEffect(() => {
    const savedDetails = JSON.parse(localStorage.getItem('userDetails')) || {};
    if (savedDetails) {
      setUserDetails(savedDetails);

      // Calculate Recommended Nutrients
      const protein = calculateTotalIntake(savedDetails.proteinIntake || {});
      const carbs = calculateTotalIntake(savedDetails.carbIntake || {});
      const fats = calculateTotalIntake(savedDetails.fatIntake || {});

      setRecommended({ protein, carbs, fats });
    }
  }, []);

  const handleFormSubmit = (details) => {
    // Save data to state
    setUserDetails(details);

    // Calculate total nutrients
    const protein = calculateTotalIntake(details.proteinIntake || {});
    const carbs = calculateTotalIntake(details.carbIntake || {});
    const fats = calculateTotalIntake(details.fatIntake || {});

    setRecommended({ protein, carbs, fats });

    // Persist updated details in localStorage
    const updatedDetails = {
      ...details,
      proteinIntake: details.proteinIntake,
      carbIntake: details.carbIntake,
      fatIntake: details.fatIntake,
    };
    localStorage.setItem('userDetails', JSON.stringify(updatedDetails));
  };

  const handleEdit = () => {
    setUserDetails(null);
    localStorage.removeItem('userDetails');
  };

  const chartOptions = {
    animationEnabled: true,
    theme: 'light2',
    title: {
      text: "Total Nutrient Intake",
    },
    data: [
      {
        type: "pie",
        indexLabel: "{label}: {y}g",
        dataPoints: [
          { y: recommended.protein, label: "Protein" },
          { y: recommended.carbs, label: "Carbs" },
          { y: recommended.fats, label: "Fats" },
        ],
      },
    ],
  };

  return (
    <PageContainer>
      {!userDetails ? (
        <UserDetailsForm onSubmit={handleFormSubmit} />
      ) : (
        <>
          <Sidebar>
  <UserInfo>
    {/* Name */}
    <UserDetail style={{ fontSize: "1.5em", fontWeight: "bold" }}>
      {userDetails.firstName || "N/A"}
    </UserDetail>
    
    {/* Age */}
    <UserDetail>
      <UserDetailLabel>Age:</UserDetailLabel> {userDetails.age || "N/A"}
    </UserDetail>
    
    {/* Lifestyle */}
    <UserDetail>
      <UserDetailLabel>Lifestyle:</UserDetailLabel> {userDetails.lifestyle || "N/A"}
    </UserDetail>
    
    {/* Protein Intake */}
    <UserDetail>
      <UserDetailLabel>Protein Intake:</UserDetailLabel> {recommended.protein}g
    </UserDetail>
    
    {/* Carbs Intake */}
    <UserDetail>
      <UserDetailLabel>Carbs Intake:</UserDetailLabel> {recommended.carbs}g
    </UserDetail>
    
    {/* Fat Intake */}
    <UserDetail>
      <UserDetailLabel>Fat Intake:</UserDetailLabel> {recommended.fats}g
    </UserDetail>
  </UserInfo>
  
  {/* Edit Button */}
  <EditButton onClick={handleEdit}>⚙️</EditButton>
</Sidebar>


          <MainContent>
            <h2>Today’s Nutrition Summary</h2>
            <NutrientCards>
              <Card>
                <Icon>🥚</Icon>
                <h3>Protein</h3>
                <p>Today's intake: {recommended.protein}g</p>
                <ProgressBar consumed={recommended.protein} recommended={50} />
              </Card>
              <Card>
                <Icon>🍞</Icon>
                <h3>Carbs</h3>
                <p>Today's intake: {recommended.carbs}g</p>
                <ProgressBar consumed={recommended.carbs} recommended={100} />
              </Card>
              <Card>
                <Icon>🧈</Icon>
                <h3>Fats</h3>
                <p>Today's intake: {recommended.fats}g</p>
                <ProgressBar consumed={recommended.fats} recommended={70} />
              </Card>
            </NutrientCards>

            <ChartContainer>
              <CanvasJSChart options={chartOptions} />
            </ChartContainer>
          </MainContent>
        </>
      )}
    </PageContainer>
  );
}

export default MealPrepPage;
