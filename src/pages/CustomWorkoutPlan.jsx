import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RoutineSummary from "../components/RoutineSummary";
import BannerImage from "../assets/Banner2.jpg";

// Import images for parent cards
import yogaImage from "../assets/yoga.png";
import cardioImage from "../assets/cardio.png";
import gymImage from "../assets/gym.png";
import sportsImage from "../assets/sports.png";

// Styled components
const PageContainer = styled.div`
  padding: 20px;
  background-color: var(--bg-color);
  color: var(--text-color);
  min-height: 100vh;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-top: 20px;
`;

const RoutineSelector = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const RoutineButton = styled.button`
  background-color: ${(props) =>
    props.isActive ? "var(--primary-color)" : "var(--bg-color)"};
  color: ${(props) => (props.isActive ? "#fff" : "var(--text-color)")};
  border: 2px solid var(--border-color);
  border-radius: 5px;
  margin: 0 10px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: var(--primary-color-dark);
    color: #fff;
  }
`;

const HeaderSection = styled.div`
  margin-bottom: 20px;
  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
`;

const ParentCardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin: 20px 0;
`;

const ParentCard = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  border: 2px solid var(--border-color);
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const CardOverlayText = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: bold;
`;

const ActivityCard = styled.div`
  position: relative;
  margin: 20px auto;
  padding: 20px;
  background-color: var(--bg-color);
  border: 2px solid var(--border-color);
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: left;

  h3 {
    margin-bottom: 10px;
  }

  label {
    display: block;
    margin-top: 10px;
    font-size: 0.9rem;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
  }

  button {
    margin-top: 15px;
    padding: 10px 20px;
    background-color: var(--primary-color);
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: var(--primary-color-dark);
    }
  }
`;



const CrossButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #ff0000;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: #ff5555;
  }
`;

function CustomWorkoutPlan() {
  const [routine, setRoutine] = useState("Morning");
  const [workoutPlans, setWorkoutPlans] = useState(() => {
    // Initialize from localStorage
    const savedPlans = localStorage.getItem("workoutPlans");
    return savedPlans ? JSON.parse(savedPlans) : {
      Morning: { categories: {} },
      Afternoon: { categories: {} },
      Evening: { categories: {} },
    };
  });

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showActivityCard, setShowActivityCard] = useState(false);
  const [activityDetails, setActivityDetails] = useState({
    exercise: "",
    time: "",
    calories: "",
  });

  // Save workout plans to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("workoutPlans", JSON.stringify(workoutPlans));
  }, [workoutPlans]);

  const parentOptions = [
    { name: "Yoga", image: yogaImage },
    { name: "Cardio", image: cardioImage },
    { name: "Gym", image: gymImage },
    { name: "Sports", image: sportsImage },
  ];

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setShowActivityCard(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActivityDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddActivity = () => {
    const { exercise, time, calories } = activityDetails;
    if (exercise && time && calories) {
      setWorkoutPlans((prev) => ({
        ...prev,
        [routine]: {
          categories: {
            ...prev[routine].categories,
            [selectedCategory]: [
              ...(prev[routine].categories[selectedCategory] || []),
              { exercise, time, calories },
            ],
          },
        },
      }));
      setActivityDetails({ exercise: "", time: "", calories: "" });
      setShowActivityCard(false);
    } else {
      alert("Please fill out all fields!");
    }
  };

  const handleDeleteActivity = (routine, category, index) => {
    setWorkoutPlans((prev) => {
      const updatedCategories = { ...prev[routine].categories };

      if (category && updatedCategories[category]) {
        updatedCategories[category].splice(index, 1);
        if (updatedCategories[category].length === 0) {
          delete updatedCategories[category];
        }
      }

      return {
        ...prev,
        [routine]: { categories: updatedCategories },
      };
    });
  };

  return (
    <PageContainer>
      <HeaderSection>
        <img src={BannerImage} alt="Workout Banner" />
      </HeaderSection>

      <SectionTitle>Log Your Daily Routine</SectionTitle>

      <RoutineSelector>
        {["Morning", "Afternoon", "Evening"].map((time) => (
          <RoutineButton
            key={time}
            isActive={routine === time}
            onClick={() => setRoutine(time)}
          >
            {time}
          </RoutineButton>
        ))}
      </RoutineSelector>

      <SectionTitle>Log Your Exercise Details</SectionTitle>
      {routine && (
        <ParentCardsContainer>
          {parentOptions.map((option) => (
            <ParentCard
              key={option.name}
              bgImage={option.image}
              onClick={() => handleSelectCategory(option.name)}
            >
              <CardOverlayText>{option.name}</CardOverlayText>
            </ParentCard>
          ))}
        </ParentCardsContainer>
      )}

      {showActivityCard && (
        <ActivityCard>
          <CrossButton onClick={() => setShowActivityCard(false)}>×</CrossButton>
          <h3>Add Activity</h3>
          <label>Routine</label>
          <input type="text" value={routine} readOnly />
          <label>Category</label>
          <input type="text" value={selectedCategory} readOnly />
          <label>Exercise</label>
          <input
            type="text"
            name="exercise"
            value={activityDetails.exercise}
            onChange={handleInputChange}
            placeholder="Enter exercise"
          />
          <label>Time Spent (minutes)</label>
          <input
            type="number"
            name="time"
            value={activityDetails.time}
            onChange={handleInputChange}
            placeholder="Enter time spent"
          />
          <label>Calories Burned</label>
          <input
            type="number"
            name="calories"
            value={activityDetails.calories}
            onChange={handleInputChange}
            placeholder="Enter calories burned"
          />
          <button onClick={handleAddActivity}>Add Activity</button>
        </ActivityCard>
      )}

      <RoutineSummary
        workoutPlans={workoutPlans}
        onDeleteActivity={handleDeleteActivity}
      />
    </PageContainer>
  );
}

export default CustomWorkoutPlan;
