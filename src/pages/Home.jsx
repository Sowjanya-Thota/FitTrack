import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import PricingSection from "../components/PricingSection";
import FAQSection from "../components/FAQSection";

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      scroller.scrollTo(location.state.scrollTo, {
        smooth: true,
        duration: 500,
        offset: -70,
      });
    }
  }, [location]);

  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      
    </div>
  );
}

export default Home;
