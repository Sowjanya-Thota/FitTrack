// src/components/RoutineSectionCard.jsx
import React from 'react';
import styled from 'styled-components';

// Styled components
const CardContainer = styled.div`
  width: 300px;
  background-color: var(--bg-color);
  border: 2px solid var(--border-color);
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  margin: 10px;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 10px;
`;

const ExercisesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ExerciseItem = styled.li`
  color: var(--subtext-color);
  font-size: 1rem;
`;

const RoutineSectionCard = ({ section, category, exercises }) => {
  return (
    <CardContainer>
      <SectionTitle>{section}</SectionTitle>
      {category && (
        <>
          <h4>{category}</h4>
          <ExercisesList>
            {exercises.map((exercise) => (
              <ExerciseItem key={exercise}>{exercise}</ExerciseItem>
            ))}
          </ExercisesList>
        </>
      )}
    </CardContainer>
  );
};

export default RoutineSectionCard;
