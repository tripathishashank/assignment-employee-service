const sqlite3 = require('sqlite3').verbose();
const Employee = require('../models/Employee');

const db = new sqlite3.Database('./employee.db');

// Create Employee table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY,
    name TEXT,
    age INTEGER,
    department TEXT
  )
`);

// Get all employees
const getAllEmployees = (req, res) => {
  db.all('SELECT * FROM employees', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ employees: rows });
  });
};

// Update an employee by ID
const updateEmployeeById = (req, res) => {
  const id = req.params.id;
  const updatedEmployee = req.body;

  db.run(
    `UPDATE employees
     SET name = ?, age = ?, department = ?
     WHERE id = ?`,
    [updatedEmployee.name, updatedEmployee.age, updatedEmployee.department, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Employee updated successfully' });
    }
  );
};

// Delete an employee by ID
const deleteEmployeeById = (req, res) => {
  const id = req.params.id;

  db.run('DELETE FROM employees WHERE id = ?', id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Employee deleted successfully' });
  });
};

module.exports = {
  getAllEmployees,
  updateEmployeeById,
  deleteEmployeeById,
};
