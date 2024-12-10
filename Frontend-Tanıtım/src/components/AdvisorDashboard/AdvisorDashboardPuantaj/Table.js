import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import styles from './AdvisorDashboardPuantaj.module.css'; // Keep your existing CSS file
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// New dummy data based on the screenshot
export const eventRows = [
  {
    id: 1,
    taskCategory: "Tour",
    task: "Campus Tour 1",
    date: "Oct 30, 2024",
    hoursTaken: 2,
    pointsCollected: 20,
    claimPoints: false,
  },
  {
    id: 2,
    taskCategory: "Tour",
    task: "Campus Tour 2",
    date: "Oct 30, 2024",
    hoursTaken: 2,
    pointsCollected: 20,
    claimPoints: true,
  },
  {
    id: 3,
    taskCategory: "Tour",
    task: "Campus Tour 3",
    date: "Oct 30, 2024",
    hoursTaken: 2,
    pointsCollected: 20,
    claimPoints: true,
  },
  {
    id: 4,
    taskCategory: "Tour",
    task: "Campus Tour 4",
    date: "Oct 30, 2024",
    hoursTaken: 2,
    pointsCollected: 20,
    claimPoints: false,
  },
  {
    id: 5,
    taskCategory: "Fair",
    task: "Career Fair",
    date: "Oct 30, 2024",
    hoursTaken: 5,
    pointsCollected: 20,
    claimPoints: true,
  },
  {
    id: 6,
    taskCategory: "Tour",
    task: "Campus Tour 5",
    date: "Oct 30, 2024",
    hoursTaken: 2,
    pointsCollected: 20,
    claimPoints: "Claimed",
  },
  {
    id: 7,
    taskCategory: "Tour",
    task: "Campus Tour 6",
    date: "Oct 30, 2024",
    hoursTaken: 2,
    pointsCollected: 20,
    claimPoints: "Claimed",
  },
];


// Dropdown component
const BasicSelect = ({ value, options, label, onChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%', // Ensures it takes the full height of the cell
      }}
    >
      <FormControl
        fullWidth
        sx={{
          '.MuiInputBase-root': {
            height: '30px', // Adjust dropdown height
          },
          '.MuiSelect-select': {
            display: 'flex',
            alignItems: 'center', // Ensures the dropdown text is vertically centered
          },
        }}
      >
        <InputLabel sx={{ fontSize: '12px' }}>{label}</InputLabel>
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          sx={{
            fontSize: '12px',
          }}
        >
          {options.map((option, index) => (
            <MenuItem
              key={index}
              value={option}
              sx={{
                fontSize: '12px',
              }}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

// Updated columns to reflect the table structure
const columns = [
  {
    field: 'taskCategory',
    headerName: 'Task Category',
    width: 180,
    renderCell: (params) => (
      <BasicSelect
        value={params.value}
        options={["Tour", "Fair"]}
        onChange={(newValue) => console.log(`Task Category Changed to: ${newValue}`)}
      />
    ),
  },
  {
    field: 'task',
    headerName: 'Select Task',
    width: 200,
    renderCell: (params) => (
      <BasicSelect
        value={params.value}
        options={["Campus Tour 1", "Campus Tour 2", "Campus Tour 3", "Career Fair"]}
        onChange={(newValue) => console.log(`Task Changed to: ${newValue}`)}
      />
    ),
  },
  { field: 'date', headerName: 'Date', width: 150 },
  {
    field: 'hoursTaken',
    headerName: 'Hours Taken',
    width: 150,
    renderCell: (params) => <span style={{ color: 'red' }}>{params.value}</span>,
  },
  { field: 'pointsCollected', headerName: 'Points Collected', width: 150 },
  {
    field: 'claimPoints',
    headerName: 'Claim Points',
    width: 150,
    renderCell: (params) => {
      if (params.value === "Claimed") {
        return <span>Claimed</span>;
      }
      return (
        <Checkbox
          checked={params.value === true}
          onChange={() => console.log(`Toggled claimPoints for ID: ${params.row.id}`)}
        />
      );
    },
  },
];

const Table = () => {
  return (
    <div className={styles.tableContainer}>
      <Paper
        sx={{
          height: '500px',
          width: '100%',
          boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <DataGrid
          rows={eventRows} // Use the updated dummy data
          columns={columns} // Use the updated columns
          pageSize={6}
          rowsPerPageOptions={[6, 10]}
          checkboxSelection={false} // Disable default checkbox selection
          disableSelectionOnClick
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f7f7f7',
              fontWeight: 'bold',
              color: '#8a0303',
              textAlign: 'center',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              textAlign: 'center',
              display: 'block',
            },
            '& .MuiDataGrid-row:nth-of-type(odd)': {
              backgroundColor: '#fce4e4',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#f9d5d5',
            },
            '& .MuiDataGrid-cell': {
              textAlign: 'center',
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
            },
          }}
        />
      </Paper>
    </div>
  );
};

export default Table;