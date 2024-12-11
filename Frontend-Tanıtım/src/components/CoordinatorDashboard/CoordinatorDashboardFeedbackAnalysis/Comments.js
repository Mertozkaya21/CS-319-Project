import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import styles from "./CoordinatorDashboardFeedbackAnalysis.module.css"; // CSS file for styling

const dummyComments = [
  {
    studentName: "John Doe",
    highSchoolName: "Springfield High School",
    tourDate: "2024-12-10",
    tourTime: "10:00 - 12:00",
    comment: "The tour was amazing! The guides were very helpful and informative.",
  },
  {
    studentName: "Jane Smith",
    highSchoolName: "Riverside High School",
    tourDate: "2024-12-12",
    tourTime: "09:00 - 11:00",
    comment: "I loved the campus environment and the detailed explanation of programs.",
  },
  {
    studentName: "Ali Khan",
    highSchoolName: "Lakeside Academy",
    tourDate: "2024-12-15",
    tourTime: "13:00 - 15:00",
    comment: "The facilities were impressive, but the tour felt a bit rushed.",
  },
  {
    studentName: "Emily Davis",
    highSchoolName: "Hilltop High School",
    tourDate: "2024-12-20",
    tourTime: "11:30 - 13:30",
    comment: "It was a fantastic experience! The staff were welcoming and answered all our questions.",
  },
  {
    studentName: "Michael Brown",
    highSchoolName: "Greenfield High",
    tourDate: "2024-12-25",
    tourTime: "10:00 - 12:00",
    comment: "The tour was well-organized, and I learned a lot about the programs offered.",
  },
  {
    studentName: "Jane Smith",
    highSchoolName: "Riverside High School",
    tourDate: "2024-12-12",
    tourTime: "09:00 - 11:00",
    comment: "I loved the campus environment and the detailed explanation of programs.",
  },
  {
    studentName: "Ali Khan",
    highSchoolName: "Lakeside Academy",
    tourDate: "2024-12-15",
    tourTime: "13:00 - 15:00",
    comment: "The facilities were impressive, but the tour felt a bit rushed.",
  },
  {
    studentName: "Emily Davis",
    highSchoolName: "Hilltop High School",
    tourDate: "2024-12-20",
    tourTime: "11:30 - 13:30",
    comment: "It was a fantastic experience! The staff were welcoming and answered all our questions.",
  },
];

const Comments = () => {
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of comments per page

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  // Calculate the comments to display on the current page
  const displayedComments = dummyComments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className={styles.commentsContainer}>
      <Typography variant="h5" className={styles.title}>
        Tour Participant Comments
      </Typography>

      {displayedComments.map((commentData, index) => (
        <Card
          key={index}
          className={styles.commentCard}
          sx={{
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
          }}
        >
          <CardContent>
            <Typography variant="body1" className={styles.commentText}>
              "{commentData.comment}"
            </Typography>
            <Typography variant="body2" className={styles.commentDetails}>
              <strong>Student:</strong> {commentData.studentName} |{" "}
              <strong>High School:</strong> {commentData.highSchoolName}
            </Typography>
            <Typography variant="body2" className={styles.commentDetails}>
              <strong>Tour Date:</strong> {commentData.tourDate} |{" "}
              <strong>Tour Time:</strong> {commentData.tourTime}
            </Typography>
          </CardContent>
        </Card>
      ))}

      {/* Pagination Component */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
        component="div"
        count={dummyComments.length} // Total number of comments
        rowsPerPage={rowsPerPage} // Rows per page
        page={page} // Current page
        onPageChange={handleChangePage} // Handle page change
        onRowsPerPageChange={handleChangeRowsPerPage} // Handle rows per page change
      />
    </div>
  );
};

export default Comments;