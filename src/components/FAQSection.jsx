// src/components/FAQSection.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

const FAQContainer = styled.section`
  padding: 60px 20px;
  background-color: var(--bg-color);   // Use theme background color
  border: 2px solid var(--border-color); 
  color: var(--text-color);            // Use theme text color
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const SectionTitle = styled.h2`
  font-size: 2em;
  color: var(--text-color);            // Use theme text color
  margin-bottom: 40px;
  font-weight: bold;
`;

const FAQList = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
`;

const FAQItem = styled.div`
  margin-bottom: 20px;
`;

const Question = styled.div`
  font-size: 1.1em;
  color: var(--primary-color);         // Use primary color for questions
  cursor: pointer;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Answer = styled.p`
  font-size: 1em;
  color: var(--subtext-color);         // Use subtext color for answers
  margin-top: 10px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const ToggleIcon = styled.span`
  font-size: 1.5em;
  color: var(--primary-color);         // Use primary color for toggle icon
`;

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: "How can I track my workouts using this platform?", answer: "Our platform allows you to log exercises, track your progress, and monitor metrics like calories burned, steps, and more." },
    { question: "Does the platform integrate with fitness wearables?", answer: "Yes, we support integration with popular fitness wearables to sync your data seamlessly." },
    { question: "Can I customize my workout plan?", answer: "Absolutely! You can create and customize workout routines based on your fitness goals and preferences." },
    { question: "How do I set fitness goals and milestones?", answer: "Our platform allows you to set specific goals and milestones to keep you motivated and on track." },
    { question: "Is there a mobile app version available?", answer: "Yes, our platform is accessible via both web and mobile apps for convenience." },
    { question: "Do I need a premium membership to access all features?", answer: "Some advanced features are available under our premium membership plan. Check our pricing page for more details." },
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <FAQContainer id="faq-section">
      <SectionTitle>Frequently Asked Questions</SectionTitle>
      <FAQList>
        {faqs.map((faq, index) => (
          <FAQItem key={index}>
            <Question onClick={() => handleToggle(index)}>
              {faq.question}
              <ToggleIcon>{openIndex === index ? '-' : '+'}</ToggleIcon>
            </Question>
            <Answer isOpen={openIndex === index}>{faq.answer}</Answer>
          </FAQItem>
        ))}
      </FAQList>
    </FAQContainer>
  );
}

export default FAQSection;
