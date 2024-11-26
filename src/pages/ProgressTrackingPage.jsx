import React, { useEffect, useState } from "react";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { LinePlot, MarkPlot } from "@mui/x-charts/LineChart";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import styled from "styled-components";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: var(--bg-color);
  color: var(--text-color);
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  padding: 0 20px;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  color: var(--primary-color);
`;

const LegendContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;

  .color-box {
    width: 16px;
    height: 16px;
    border-radius: 4px;
  }
`;

const ChartSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
`;

const ChartBackground = styled.div`
  background-color: #540f76;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex: 2;
`;

const PieChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: 'var(--text-color)',
`;

const UserReportContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  padding: 20px;
  background-color: #f5f5f5;
  color: ${(props) => (props.remaining >= 0 ? "#1E90FF" : "#FF4500")};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  font-size: 1.2rem;
  line-height: 1.8;
`;

const RemainingCaloriesContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${(props) => (props.remaining >= 0 ? "#1E90FF" : "#FF4500")};
`;

function ProgressTrackingPage() {
  const [uData, setUData] = useState([]); // Calories Consumed
  const [pData, setPData] = useState([]); // Calories Burned
  const [xLabels, setXLabels] = useState(["Morning", "Afternoon", "Evening"]); // Fixed xLabels
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const savedUserDetails =
      JSON.parse(localStorage.getItem("userDetails")) || {};
    const savedWorkoutPlans =
      JSON.parse(localStorage.getItem("workoutPlans")) || {};

    setUserDetails(savedUserDetails);

    const calculateCalories = (macros) => {
      const proteinCalories = parseFloat(macros.protein || 0) * 4;
      const carbCalories = parseFloat(macros.carb || 0) * 4;
      const fatCalories = parseFloat(macros.fat || 0) * 9;
      return proteinCalories + carbCalories + fatCalories;
    };

    const intakeCalories = ["morning", "afternoon", "evening"].map((time) =>
      savedUserDetails.proteinIntake &&
      savedUserDetails.carbIntake &&
      savedUserDetails.fatIntake
        ? calculateCalories({
            protein: savedUserDetails.proteinIntake[time] || 0,
            carb: savedUserDetails.carbIntake[time] || 0,
            fat: savedUserDetails.fatIntake[time] || 0,
          })
        : 0
    );

    const burnedCalories = ["Morning", "Afternoon", "Evening"].map((time) => {
      const routine = savedWorkoutPlans[time] || { categories: {} };
      return Object.values(routine.categories).reduce((catTotal, exercises) => {
        return (
          catTotal +
          exercises.reduce(
            (exTotal, exercise) => exTotal + parseFloat(exercise.calories || 0),
            0
          )
        );
      }, 0);
    });

    setUData(intakeCalories);
    setPData(burnedCalories);
  }, []);

  // Calculate total calories consumed, burned, and remaining
  const totalCaloriesConsumed = uData.reduce((sum, value) => sum + value, 0);
  const totalCaloriesBurned = pData.reduce((sum, value) => sum + value, 0);
  const remainingCalories = totalCaloriesConsumed - totalCaloriesBurned;

  // Fitness Goal and Suggestions
  const fitnessGoal =
    userDetails?.lifestyle === "normal"
      ? "Weight Maintenance"
      : userDetails?.lifestyle === "cardio"
      ? "Weight Loss"
      : "Weight Gain";

  const reportContent =
    fitnessGoal === "Weight Maintenance"
      ? `To maintain your weight, your calorie intake and burn should be balanced. Your current ratio of calories consumed to calories burned is ${(
          totalCaloriesConsumed / totalCaloriesBurned
        ).toFixed(2)}.`
      : fitnessGoal === "Weight Loss"
      ? `For weight loss, aim to burn more calories than you consume. Your current ratio of calories consumed to calories burned is ${(
          totalCaloriesConsumed / totalCaloriesBurned
        ).toFixed(2)}. Try to keep this ratio below 1.`
      : `For weight gain, aim to consume more calories than you burn. Your current ratio of calories consumed to calories burned is ${(
          totalCaloriesConsumed / totalCaloriesBurned
        ).toFixed(2)}. Try to keep this ratio above 1.`;

  const suggestions =
    fitnessGoal === "Weight Maintenance"
      ? "Consider maintaining a consistent routine with balanced meals and moderate exercise to keep your weight stable."
      : fitnessGoal === "Weight Loss"
      ? "Focus on incorporating more cardio exercises like running or cycling into your routine and reducing high-calorie snacks."
      : "Incorporate strength training and protein-rich foods into your diet to support healthy weight gain.";

  // Data for the pie chart
  const pieData = {
    labels: ["Consumed", "Burned"],
    datasets: [
      {
        data: [totalCaloriesConsumed, totalCaloriesBurned],
        backgroundColor: ["#1E90FF", "#FFD700"],
        hoverOffset: 4,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || "";
            const value = tooltipItem.raw || 0;
            return `${label}: ${value.toFixed(2)} kcal`;
          },
        },
      },
    },
  };

  return (
    <PageContainer>
      {/* Header Section */}
      <Header>
        <Heading>Progress Tracking</Heading>
      </Header>

      {/* Charts Section */}
      <ChartSection>
        <ChartBackground>
          {/* Legends for the Line Chart */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div
                className="color-box"
                style={{
                  width: "16px",
                  height: "16px",
                  backgroundColor: "#1E90FF",
                  borderRadius: "4px",
                }}
              ></div>
              <span style={{ fontSize: "1rem", color: "#FFFFFF" }}>
                Calories Consumed
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div
                className="color-box"
                style={{
                  width: "16px",
                  height: "16px",
                  backgroundColor: "#FFD700",
                  borderRadius: "4px",
                }}
              ></div>
              <span style={{ fontSize: "1rem", color: "#FFFFFF" }}>
                Calories Burned
              </span>
            </div>
          </div>

          <ChartContainer
            width={900}
            height={500}
            padding={{ left: 80, right: 50, top: 20, bottom: 40 }}
            series={[
              {
                data: pData,
                label: "Calories Burned",
                type: "line",
                color: "#FFD700",
              },
              {
                data: uData,
                label: "Calories Consumed",
                type: "line",
                color: "#1E90FF",
              },
            ]}
            xAxis={[
              {
                scaleType: "point",
                data: xLabels,
                axisLine: { style: { stroke: "#FFFFFF", strokeWidth: 2 } },
                tickLabelStyle: { fill: "#FFFFFF", fontSize: 14 },
                label: "Time Periods (Morning, Afternoon, Evening)",
                labelStyle: {
                  fill: "#FFFFFF",
                  fontSize: 16,
                  fontWeight: "bold",
                },
              },
            ]}
            yAxis={[
              {
                axisLine: { style: { stroke: "#FFFFFF", strokeWidth: 2 } },
                tickLabelStyle: { fill: "#FFFFFF", fontSize: 14 },
                label: "Calories",
                labelStyle: {
                  fill: "#FFFFFF",
                  fontSize: 16,
                  fontWeight: "bold",
                  transform: "rotate(90deg)",
                  textAnchor: "middle",
                  dx: -40,
                },
              },
            ]}
          >
            <LinePlot />
            <MarkPlot />
            <ChartsReferenceLine
              x="Afternoon"
              label="Reference Period"
              lineStyle={{ stroke: "red", strokeWidth: 2 }}
              labelStyle={{ fill: "red", fontWeight: "bold" }}
            />
            <ChartsXAxis />
            <ChartsYAxis />
          </ChartContainer>
        </ChartBackground>

        <PieChartContainer>
          <h3 style={{ color: 'black' }}>Total Calories Distribution</h3>
          <Pie data={pieData} options={pieOptions} />
        </PieChartContainer>
      </ChartSection>

      {/* User Report */}
      <UserReportContainer>
        <h3>User Report</h3>
        <p>{reportContent}</p>
        <h4>Suggestions</h4>
        <p>{suggestions}</p>
        <RemainingCaloriesContainer remaining={remainingCalories}>
          Remaining Calories:{" "}
          {remainingCalories >= 0
            ? `${remainingCalories} kcal surplus`
            : `Deficit of ${Math.abs(remainingCalories)} kcal`}
        </RemainingCaloriesContainer>
      </UserReportContainer>
    </PageContainer>
  );
}

export default ProgressTrackingPage;
