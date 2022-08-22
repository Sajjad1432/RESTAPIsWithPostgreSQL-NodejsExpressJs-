const pool = require("../../db");
const queries = require("./queries");

// Get All Students
const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

// Get single student by ID
const getStudentById = (req, res) => {
  const id = req.params.id;
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

// Add New Student
const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;
  // Check if email exists
  pool.query(queries.checkEmailExistence, [email], (error, results) => {
    if (results.rows.length) {
      res.send("Email already exists!");
    }
    // Add student
    pool.query(
      queries.addStudent,
      [name, email, age, dob],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("Student created successfully!");
      }
    );
  });
};

// Delete Student by ID
const deleteStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  //   Check either student exist or not!
  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("Student does not exist in database!");
    }
    // Delete student from database
    pool.query(queries.deleteStudentById, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Student deleted from database successfully!");
    });
  });
};

// Update Student
const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  // Define the schema which you want to update currently I am updating only name of the student

  const { name } = req.body;

  //   Check either student exist or not!
  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("Student does not exist in database!");
    }
    // Update student from database
    pool.query(queries.updateStudent, [name, id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Student updated successfully!");
    });
  });
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  deleteStudentById,
  updateStudent,
};
