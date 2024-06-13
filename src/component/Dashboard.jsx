import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Grid, Paper } from "@mui/material";
import LineChartComponent from "./LineChart"; // Import your LineChart component
import BarChartComponent from "./BarChart"; // Import your BarChart component
import PieChartComponent from "./PieChart"; // Import your PieChart component

export default function Dashboard() {
  const [candidateData, setCandidateData] = useState([]);

  // Fetch candidate data from your Express.js route
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/candidates/all")
      .then((response) => {
        setCandidateData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching candidate data:", error);
      });
  }, []);

  // Sample data for the charts (replace with your own data)
  const barChartData = [
    { name: "January", value: 65 },
    { name: "February", value: 59 },
    { name: "March", value: 80 },
    { name: "April", value: 81 },
    { name: "May", value: 56 },
  ];

  const pieChartData = [
    { name: "Red", value: 12, color: "#FF5733" },
    { name: "Blue", value: 19, color: "#337DFF" },
    { name: "Yellow", value: 3, color: "#FFFF33" },
    { name: "Green", value: 5, color: "#33FF33" },
    { name: "Purple", value: 2, color: "#8333FF" },
  ];

  return (
    <Container maxWidth="lg" sx={{ marginTop: 8 }}>
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Bar Chart
            </Typography>
            <BarChartComponent data={barChartData} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Pie Chart
            </Typography>
            <PieChartComponent data={pieChartData} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Line Chart
            </Typography>
            <LineChartComponent data={candidateData} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
