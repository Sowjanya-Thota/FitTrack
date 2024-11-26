import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MealPrepPage from './pages/MealPrepPage';
import CustomWorkoutPlan from './pages/CustomWorkoutPlan'; // Import CustomWorkoutPlan
import { ThemeProvider } from './components/ThemeContext';
import ProgressTrackingPage from './pages/ProgressTrackingPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="meal-prep" element={<MealPrepPage />} />
            <Route path="custom-workout-plan" element={<CustomWorkoutPlan />} /> {/* Add the route */}
            <Route path="/progress-tracking" element={<ProgressTrackingPage />} />         
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
