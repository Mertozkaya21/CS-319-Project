import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./CoordinatorDashboardPayments.module.css";

// Data
const rows = [
  { id: 1, date: "01-12-2024", time: "09:00 AM", amount: "$200", status: "Pending" },
  { id: 2, date: "05-12-2024", time: "10:30 AM", amount: "$150", status: "Completed" },
  { id: 3, date: "06-12-2024", time: "02:00 PM", amount: "$300", status: "Canceled" },
  { id: 4, date: "06-12-2024", time: "01:00 PM", amount: "$250", status: "Completed" },
  { id: 5, date: "07-12-2024", time: "03:45 PM", amount: "$180", status: "Pending" },
  { id: 6, date: "10-12-2024", time: "11:15 AM", amount: "$220", status: "Completed" },
  { id: 7, date: "11-12-2024", time: "08:30 AM", amount: "$400", status: "Canceled" },
  { id: 8, date: "14-12-2024", time: "12:00 PM", amount: "$350", status: "Pending" },
  { id: 9, date: "16-12-2024", time: "04:30 PM", amount: "$280", status: "Completed" },
  { id: 10, date: "24-12-2024", time: "10:00 AM", amount: "$500", status: "Pending" },
];

export default function CustomTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5); // Default to 5 rows per page

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page on rows per page change
  };

  return (
    <div className={styles.tableContainer}>
      <Paper sx={{ borderRadius: "10px", boxShadow: "0 3px 5px rgba(0, 0, 0, 0.1)" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table sx={{ minWidth: 500 }} stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Time</TableCell>
                <TableCell align="left">Amount</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Apply pagination
                .map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                      "&:hover": { backgroundColor: "#f1f1f1" },
                    }}
                  >
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="left">{row.date}</TableCell>
                    <TableCell align="left">{row.time}</TableCell>
                    <TableCell align="left">{row.amount}</TableCell>
                    <TableCell align="left" sx={{ color: getStatusColor(row.status) }}>
                      {row.status}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
          component="div"
          count={rows.length} // Total number of rows
          rowsPerPage={rowsPerPage} // Rows per page
          page={page} // Current page
          onPageChange={handleChangePage} // Handle page change
          onRowsPerPageChange={handleChangeRowsPerPage} // Handle rows per page change
        />
      </Paper>
    </div>
  );
}

// Helper function to get status color
function getStatusColor(status) {
  switch (status) {
    case "Pending":
      return "#ffa500"; // Orange
    case "Completed":
      return "#28a745"; // Green
    case "Canceled":
      return "#dc3545"; // Red
    default:
      return "#6c757d"; // Neutral gray
  }
}