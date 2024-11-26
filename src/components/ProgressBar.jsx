// src/components/ProgressBar.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

const fillAnimation = keyframes`
  from { width: 0; }
  to { width: ${({ percentage }) => percentage}%; }
`;

const BarContainer = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  height: 8px;
  margin-top: 10px;
`;

const Fill = styled.div`
  height: 100%;
  background-color: ${({ percentage }) => (percentage >= 100 ? "#4caf50" : "#007bff")};
  width: ${({ percentage }) => percentage}%;
  max-width: 100%;
  animation: ${fillAnimation} 1s ease-out forwards;
  transition: width 0.3s ease;
`;

const ProgressBar = ({ consumed, recommended }) => {
  const percentage = Math.min((consumed / recommended) * 100, 100);

  return (
    <BarContainer>
      <Fill percentage={percentage} />
    </BarContainer>
  );
};

export default ProgressBar;
