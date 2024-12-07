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

// Updated Data
const rows = [
  { id: 1, name: "Samantha W.", amount: "$200", dueDate: "10-12-2024" },
  { id: 2, name: "Tony Soap", amount: "$150", dueDate: "12-12-2024" },
  { id: 3, name: "Jordan Nico", amount: "$300", dueDate: "14-12-2024" },
  { id: 4, name: "Karen Hope", amount: "$250", dueDate: "17-12-2024" },
  { id: 5, name: "Nadila Adja", amount: "$180", dueDate: "19-12-2024" },
  { id: 6, name: "John Smith", amount: "$220", dueDate: "20-12-2024" },
  { id: 7, name: "Emily Jones", amount: "$400", dueDate: "23-12-2024" },
  { id: 8, name: "Robert Brown", amount: "$350", dueDate: "25-12-2024" },
  { id: 9, name: "Alice Green", amount: "$280", dueDate: "27-12-2024" },
  { id: 10, name: "Michael White", amount: "$500", dueDate: "28-12-2024" },
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
                <TableCell align="center" sx={{ width: "50px" }}>ID</TableCell>
                <TableCell align="left" sx={{ width: "70px" }}>Name</TableCell>
                <TableCell align="left" sx={{ width: "40px" }}>Amount</TableCell>
                <TableCell align="left" sx={{ width: "90px" }}>Due Date</TableCell>
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
                    <TableCell align="center" sx={{ width: "50px" }}>{row.id}</TableCell>
                    <TableCell align="left" sx={{ width: "70px" }}>{row.name}</TableCell>
                    <TableCell align="left" sx={{ width: "4px" }}>{row.amount}</TableCell>
                    <TableCell align="left" sx={{ width: "90px" }}>{row.dueDate}</TableCell>
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