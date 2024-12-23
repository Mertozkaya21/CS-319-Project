import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import styles from './AdvisorDashboardPuantaj.module.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

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
          value={value || ''}
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

const Table = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/v1/events');
        const formattedTasks = response.data.map(event => ({
          id: event.id,
          taskCategory: event.tourType ? "Tour" : "Fair",
          task: event.name,
          date: new Date(event.date).toLocaleDateString(),
          hoursTaken: event.duration || 2,
          pointsCollected: event.points || 20,
          claimPoints: false,
        }));
        setTasks(formattedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskCategoryChange = useCallback((newValue, rowId) => {
    setTasks(prev => prev.map(task => 
      task.id === rowId ? { ...task, taskCategory: newValue, task: '' } : task
    ));
  }, []);

  const handleTaskChange = useCallback((newValue, rowId) => {
    setTasks(prev => prev.map(task => 
      task.id === rowId ? { ...task, task: newValue } : task
    ));
  }, []);

  const handleClaimPointsChange = useCallback((rowId) => {
    setTasks(prev => prev.map(task => 
      task.id === rowId ? { ...task, claimPoints: !task.claimPoints } : task
    ));
  }, []);

  const columns = [
    {
      field: 'taskCategory',
      headerName: 'Task Category',
      width: 180,
      renderCell: (params) => (
        <BasicSelect
          value={params.value}
          options={["Tour", "Fair"]}
          onChange={(newValue) => handleTaskCategoryChange(newValue, params.row.id)}
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
          options={tasks
            .filter(t => t.taskCategory === params.row.taskCategory)
            .map(t => t.task)}
          onChange={(newValue) => handleTaskChange(newValue, params.row.id)}
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
            onChange={() => handleClaimPointsChange(params.row.id)}
          />
        );
      },
    },
  ];

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
          rows={tasks}
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