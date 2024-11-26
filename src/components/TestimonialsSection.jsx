// src/components/TestimonialsSection.jsx
import React from 'react';
import styled from 'styled-components';

const TestimonialsContainer = styled.section`
  padding: 60px 20px;
  background-color: var(--bg-color);   /* Theme-based background color */
  border: 2px solid var(--border-color); 
  color: var(--text-color);            /* Theme-based text color */
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const SectionTitle = styled.h2`
  font-size: 2em;
  color: var(--text-color);            /* Theme-based text color */
  margin-bottom: 40px;
  font-weight: bold;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const TestimonialCard = styled.div`
  background-color: var(--card-bg-color);  /* Theme-based card background color */
  border-radius: 10px;
  border: 2px solid var(--border-color); 
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  transition: background-color 0.3s ease;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--avatar-bg-color); /* Theme-based avatar color */
  margin-right: 10px;
`;

const UserName = styled.h4`
  font-size: 1.1em;
  color: var(--text-color);            /* Theme-based text color */
  margin: 0;
`;

const UserFeedback = styled.p`
  font-size: 1em;
  color: var(--subtext-color);         /* Theme-based subtext color */
`;

function TestimonialsSection() {
  return (
    <TestimonialsContainer>
      <SectionTitle>Real Results from Real Users</SectionTitle>
      <TestimonialsGrid>
        <TestimonialCard>
          <UserInfo>
            <Avatar />
            <UserName>Sarah Lee</UserName>
          </UserInfo>
          <UserFeedback>
            "The platform has been transformative! I track my workouts, meals, and goals all in one place. It’s incredibly motivating."
          </UserFeedback>
        </TestimonialCard>
        <TestimonialCard>
          <UserInfo>
            <Avatar />
            <UserName>John Thompson</UserName>
          </UserInfo>
          <UserFeedback>
            "This fitness tracker gives me everything I need to stay on top of my fitness goals. I feel more in control of my health."
          </UserFeedback>
        </TestimonialCard>
        <TestimonialCard>
          <UserInfo>
            <Avatar />
            <UserName>Olivia Rogers</UserName>
          </UserInfo>
          <UserFeedback>
            "Keeping track of my daily steps, meals, and workouts has never been easier. I love how seamless it is!"
          </UserFeedback>
        </TestimonialCard>
        {/* Add more testimonials as needed */}
      </TestimonialsGrid>
    </TestimonialsContainer>
  );
}

export default TestimonialsSection;
