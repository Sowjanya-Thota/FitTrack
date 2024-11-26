import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)({
  padding: '10px 20px',
  fontSize: '1rem',
  fontWeight: 'bold',
  textTransform: 'none',
  borderRadius: '8px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#007bff',
  color: '#ffffff',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    backgroundColor: '#0056b3',
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
  },
});

export default function UserDetailsForm({ onSubmit }) {
  const [details, setDetails] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    lifestyle: '',
    proteinIntake: { morning: '', afternoon: '', evening: '' },
    carbIntake: { morning: '', afternoon: '', evening: '' },
    fatIntake: { morning: '', afternoon: '', evening: '' },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const [macro, time] = name.split('_'); // e.g., "proteinIntake_morning"
    if (macro && time) {
      setDetails((prev) => ({
        ...prev,
        [macro]: { ...prev[macro], [time]: value },
      }));
    } else {
      setDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Calculate overall totals
    const overallProtein =
      parseInt(details.proteinIntake.morning || 0) +
      parseInt(details.proteinIntake.afternoon || 0) +
      parseInt(details.proteinIntake.evening || 0);

    const overallCarbs =
      parseInt(details.carbIntake.morning || 0) +
      parseInt(details.carbIntake.afternoon || 0) +
      parseInt(details.carbIntake.evening || 0);

    const overallFat =
      parseInt(details.fatIntake.morning || 0) +
      parseInt(details.fatIntake.afternoon || 0) +
      parseInt(details.fatIntake.evening || 0);

    const totalCalories = overallProtein * 4 + overallCarbs * 4 + overallFat * 9;

    onSubmit({
      ...details,
      overall: { protein: overallProtein, carbs: overallCarbs, fat: overallFat, totalCalories },
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '50%',
        margin: '0 auto',
        color: 'var(--text-color)',
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: 'var(--border2-color)',
      }}
    >
      {/* Basic User Info */}
      <TextField
        label="First Name"
        name="firstName"
        value={details.firstName}
        onChange={handleChange}
        variant="outlined"
        required
      />
      <TextField
        label="Middle Name (optional)"
        name="middleName"
        value={details.middleName}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={details.lastName}
        onChange={handleChange}
        variant="outlined"
        required
      />
      <TextField
        label="Age"
        name="age"
        type="number"
        value={details.age}
        onChange={handleChange}
        variant="outlined"
        required
      />
      <TextField
        id="outlined-gender"
        select
        label="Gender"
        name="gender"
        value={details.gender}
        onChange={handleChange}
        required
      >
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
        <MenuItem value="other">Other</MenuItem>
      </TextField>
      <TextField
        label="Height (cm)"
        name="height"
        type="number"
        value={details.height}
        onChange={handleChange}
        variant="outlined"
        required
      />
      <TextField
        label="Weight (kg)"
        name="weight"
        type="number"
        value={details.weight}
        onChange={handleChange}
        variant="outlined"
        required
      />
      <TextField
        id="outlined-lifestyle"
        select
        label="Lifestyle"
        name="lifestyle"
        value={details.lifestyle}
        onChange={handleChange}
        required
      >
        <MenuItem value="normal">Normal</MenuItem>
        <MenuItem value="cardio">Cardio Enthusiast</MenuItem>
        <MenuItem value="gym">Gym Enthusiast</MenuItem>
      </TextField>

      {/* Macros Input */}
      <h3>Protein Intake (g)</h3>
      <TextField label="Morning" name="proteinIntake_morning" value={details.proteinIntake.morning} onChange={handleChange} />
      <TextField label="Afternoon" name="proteinIntake_afternoon" value={details.proteinIntake.afternoon} onChange={handleChange} />
      <TextField label="Evening" name="proteinIntake_evening" value={details.proteinIntake.evening} onChange={handleChange} />

      <h3>Carbs Intake (g)</h3>
      <TextField label="Morning" name="carbIntake_morning" value={details.carbIntake.morning} onChange={handleChange} />
      <TextField label="Afternoon" name="carbIntake_afternoon" value={details.carbIntake.afternoon} onChange={handleChange} />
      <TextField label="Evening" name="carbIntake_evening" value={details.carbIntake.evening} onChange={handleChange} />

      <h3>Fat Intake (g)</h3>
      <TextField label="Morning" name="fatIntake_morning" value={details.fatIntake.morning} onChange={handleChange} />
      <TextField label="Afternoon" name="fatIntake_afternoon" value={details.fatIntake.afternoon} onChange={handleChange} />
      <TextField label="Evening" name="fatIntake_evening" value={details.fatIntake.evening} onChange={handleChange} />

      <StyledButton type="submit">Submit</StyledButton>
    </Box>
  );
}
