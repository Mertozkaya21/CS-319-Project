import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import React, { useState, useEffect } from "react";
import { NavLink ,useNavigate} from "react-router-dom";

const trainees = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Ali Khan" },
  { id: 4, name: "Sara Lee" },
  { id: 5, name: "Emma Brown" },
];

const AddGuide = () => {

  const [trainees, setTrainees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTraineeId, setSelectedTraineeId] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    // Fetch trainees from backend using fetch
    const fetchTrainees = async () => {
      try {
        const response = await fetch("http://localhost:8080/v1/user/dropdown/eligibletrainees"); //only eligible trainees
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTrainees(data);
      } catch (err) {
        setError("Failed to load trainees");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if a trainee is selected
    if (!selectedTraineeId) {
      alert("Please select a trainee");
      return;
    }
    const traineeId = selectedTraineeId.split(" - ")[0];
    // Send the selected trainee ID to the backend
    try {
      const response = await fetch(`http://localhost:8080/v1/user/trainee/${traineeId}/promote`, {
        method: "POST",
      });

      if (response.ok) {
        // Redirect to the guides dashboard after successful submission
        navigate("/coordinatordashboardguides");
      } else {
        alert("Failed to promote trainee");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box>Error: {error}</Box>;

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "0px 0px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Form Header */}
      <Box
        sx={{
          backgroundColor: "#8a0303",
          padding: "10px 20px",
          borderRadius: "12px 12px 0 0",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Add New Guide
      </Box>

      {/* Form Fields */}
      <Box
        component="form"
        sx={{
          display: "grid",
          gap: 3,
          padding: "20px",
        }}
        noValidate
        autoComplete="off"
      >
        {/* Dropdown for Trainee Selection */}
        <TextField
        select
        required
        id="select-trainee"
        label="Choose Trainee to Promote to Guide"
        placeholder="Choose Trainee"
        fullWidth
        value={selectedTraineeId || ""}
        onChange={(e) => setSelectedTraineeId(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon sx={{ color: "#8a0303" }} />
            </InputAdornment>
          ),
        }}
      >
        {trainees.length > 0 ? (
          trainees.map((trainee) => (
            <MenuItem key={trainee} value={trainee}>
              {trainee}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No trainees eligible</MenuItem>
        )}
      </TextField>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          padding: "0 20px 20px",
        }}
      >
        <Button
          component={NavLink}
          to="/coordinatordashboardguides" // Redirect to guides Dashboard
          variant="outlined"
          sx={{
            color: "#8a0303",
            borderColor: "#8a0303",
            "&:hover": {
              backgroundColor: "#fdeaea",
              borderColor: "#8a0303",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          component={NavLink}
          to="/coordinatordashboardguides" // Redirect to guides Dashboard
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#8a0303",
            "&:hover": { backgroundColor: "#b10505" },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default AddGuide;