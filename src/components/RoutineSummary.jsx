// src/components/RoutineSummary.jsx
import React from "react";
import styled from "styled-components";

const WorkoutSummaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 20px;
  margin-top: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
`;

const SummaryCard = styled.div`
  position: relative;
  background-color: var(--bg-color);
  color: var(--text-color);
  border: 2px solid var(--border-color);
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  text-align: left;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
`;

const CrossButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #ff0000;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ff5555;
  }
`;

const CategoryHeader = styled.h4`
  margin: 10px 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 5px;
  border-radius: 5px;
`;

const ExerciseList = styled.ul`
  padding-left: 20px;

  li {
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const ExerciseText = styled.span`
  flex: 1;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ff0000;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    color: #ff5555;
  }
`;

const RoutineSummary = ({ workoutPlans, onDeleteActivity }) => {
  return (
    <WorkoutSummaryContainer>
      {Object.entries(workoutPlans).map(([time, { categories }]) =>
        Object.keys(categories).length > 0 ? (
          <SummaryCard key={time}>
            <h3>{time}</h3>
            {Object.entries(categories).map(([category, exercises]) => (
              <div key={category}>
                <CategoryHeader>{category}</CategoryHeader>
                <ExerciseList>
                  {exercises.map((exercise, index) => (
                    <li key={index}>
                      <ExerciseText>
                        {exercise.exercise} - {exercise.time} mins,{" "}
                        {exercise.calories} kcal
                      </ExerciseText>
                      <DeleteButton
                        onClick={() => onDeleteActivity(time, category, index)}
                      >
                        ×
                      </DeleteButton>
                    </li>
                  ))}
                </ExerciseList>
              </div>
            ))}
          </SummaryCard>
        ) : null
      )}
    </WorkoutSummaryContainer>
  );
};

export default RoutineSummary;
