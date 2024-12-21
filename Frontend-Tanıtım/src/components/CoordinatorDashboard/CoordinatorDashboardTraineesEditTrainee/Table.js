import React, { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import FlagIcon from "@mui/icons-material/Flag"; // Import FlagIcon

// Trainees Data
const traineesRows = [
  { id: 1, name: "Samanta William", phone: "555-123-4561", email: "samanta.william@example.com", status: "Observing", advisorResponsible: "Tony Soap" },
  { id: 2, name: "Tony Soap", phone: "555-123-4562", email: "tony.soap@example.com", status: "Practicing", advisorResponsible: "Jordan Nico" },
  { id: 3, name: "Karen Hope", phone: "555-123-4563", email: "karen.hope@example.com", status: "On Trial", advisorResponsible: "Samanta William" },
  { id: 4, name: "Jordan Nico", phone: "555-987-6541", email: "jordan.nico@example.com", status: "Practicing", advisorResponsible: "Nadila Adja" },
  { id: 5, name: "Nadila Adja", phone: "555-987-6542", email: "nadila.adja@example.com", status: "On Trial", advisorResponsible: "Johnny Ahmad" },
  { id: 6, name: "Johnny Ahmad", phone: "555-654-3211", email: "johnny.ahmad@example.com", status: "Observing", advisorResponsible: "Karen Hope" },
];

// Advisors Data
const advisors = [
  { id: 1, name: "Samanta William" },
  { id: 2, name: "Tony Soap" },
  { id: 3, name: "Karen Hope" },
  { id: 4, name: "Jordan Nico" },
  { id: 5, name: "Nadila Adja" },
  { id: 6, name: "Johnny Ahmad" },
];

const Table = () => {
  const { id } = useParams(); // Extract the ID from the URL
  const [advisors, setAdvisors] = useState([]);
  const [traineeStatuses, setTraineeStatuses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    status: "",
    advisorResponsible: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch Trainee Data
 useEffect(() => {
      const fetchTraineeData = async () => {
        try {
          const response = await fetch(`http://localhost:8080/v1/user/trainee/${id}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const trainee = await response.json();
          const updatedTrainee = {
            ...trainee,
            name: `${trainee.firstName} ${trainee.lastName}`,
          };        
          setFormData(updatedTrainee);
        } catch (error) {
          console.error("Failed to fetch trainee data:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchTraineeData();
    }, [id]);

    useEffect(() => {
        const fetchAdvisors = async () => {
          try {
            const response = await fetch("http://localhost:8080/v1/user/dropdown/advisors"); // API endpoint
            if (!response.ok) {
              throw new Error("Failed to fetch advisors.");
            }
            const data = await response.json();
            console.log(data);
            // Backend'den gelen veriyi uygun formatta dönüştür
            const formattedAdvisors = data.map((item) => {
              const [id, name] = Object.entries(item)[0]; // Anahtar ve değer al
              return { 
                id: id,  
                name: name  
              };   
            });
      
            setAdvisors(formattedAdvisors);
            console.log(formattedAdvisors);
          } catch (error) {
            console.error("Error fetching advisors:", error);
          }
        };
        const fetchTraineeStatus = async () => {
          try {
            const response = await fetch('http://localhost:8080/v1/highschool/dropdown/traineestatus'); // City'leri çeken API endpoint
            const data = await response.json();
            console.log(data);
            setTraineeStatuses(data); // City'leri state'e kaydedin
          } catch (error) {
            console.error('Error fetching trainee status:', error);
          }
        };
        fetchAdvisors();
        fetchTraineeStatus();
      }, []);

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Form Submit
  const navigate = useNavigate();
    // Handle Form Submit
    const handleSubmit = async (e) => {
      console.log(JSON.stringify(formData));
      e.preventDefault(); // Sayfanın yenilenmesini engeller
  
      const nameParts = formData.name.split(" ");
      formData.firstName = nameParts.slice(0, -1).join(" "); // Son eleman hariç kalanları birleştir
      formData.lastName = nameParts[nameParts.length - 1];
  
      try {
        const response = await fetch(`http://localhost:8080/v1/user/trainee/${id}`, {
          method: "PATCH", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Form verilerini JSON formatında gönder
        });
    
        if (!response.ok) {
          throw new Error("Failed to update trainee details.");
        }
    
        const result = await response.json();
        console.log("Updated Trainee Data:", result);
        alert("Trainee details updated successfully!");
        navigate("/coordinatordashboardtrainees");
      } catch (error) {
        console.error("Error submitting trainee details:", error);
        alert("Failed to update trainee details. Please try again.");
      }
    };
  if (loading) return <div>Loading...</div>;

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
        Personal Details
      </Box>

      {/* Form Fields */}
      <Box
        component="form"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, // Responsive layout
          gap: 3,
          padding: "20px",
        }}
        noValidate
        autoComplete="off"
      >
        {/* Name */}
        <TextField
          required
          name="name"
          label="Trainee Name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
          }}
        />
        {/* Email */}
        <TextField
          required
          name="email"
          label="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
          }}
        />
        {/* Phone Number */}
        <TextField
          required
          name="phoneNo"
          label="Phone Number"
          value={formData.phoneNo}
          onChange={handleInputChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
          }}
        />
        {/* Dropdown for Responsible Advisor */}
        <TextField
          select
          name="advisorResponsible"
          label="Advisor Responsible"
          value={`${formData.advisor.firstName} ${formData.advisor.lastName}`}
          onChange={(event) => {
            const selectedId = event.target.value;
            setFormData((prevFormData) => ({ ...prevFormData, advisorId: selectedId }));
          }}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SupervisorAccountIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
          }}
        >
          {advisors.map((advisor) => (
            <MenuItem key={advisor.id} value={advisor.name}>
              {advisor.name}
            </MenuItem>
          ))}
        </TextField>
        {/* Status Dropdown */}
        <TextField
          select
          name="status"
          label="Status"
          value={formData.status}
          onChange={handleInputChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SupervisorAccountIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
          }}
        >
          {traineeStatuses.length > 0 ? (
            traineeStatuses.map((statuses) => (
              <MenuItem key={statuses} value={statuses}>
                {statuses}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No trainee status available</MenuItem>
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
        to="/coordinatordashboardtrainees" // Redirect to trainees Dashboard
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
          onClick={handleSubmit}
          variant="contained"
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

export default Table;