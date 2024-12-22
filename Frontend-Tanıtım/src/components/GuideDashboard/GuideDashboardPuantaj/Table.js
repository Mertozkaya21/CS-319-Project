import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import styles from './GuideDashboardPuantaj.module.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Keep the existing BasicSelect component exactly as is
const BasicSelect = ({ value, options, label, onChange }) => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    }}>
      <FormControl fullWidth sx={{
        '.MuiInputBase-root': { height: '30px' },
        '.MuiSelect-select': {
          display: 'flex',
          alignItems: 'center',
        },
      }}>
        <InputLabel sx={{ fontSize: '12px' }}>{label}</InputLabel>
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          sx={{ fontSize: '12px' }}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option} sx={{ fontSize: '12px' }}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

// Keep the existing columns structure
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

const Table = ({ events }) => {
  const rows = events.map(event => ({
    id: event.id,
    taskCategory: event.tourType ? "Tour" : "Fair",
    task: event.name,
    date: new Date(event.date).toLocaleDateString(),
    hoursTaken: event.duration || 2,
    pointsCollected: event.points || 20,
    claimPoints: false,
  }));

  return (
    <div className={styles.tableContainer}>
      <Paper sx={{
        height: '500px',
        width: '100%',
        boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        overflow: 'hidden',
      }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[6, 10]}
          checkboxSelection={false}
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