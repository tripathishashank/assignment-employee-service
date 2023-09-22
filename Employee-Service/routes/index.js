const express = require('express');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

// Define dynamic CRUD routes
const createCRUDRoute = (action, controllerFunc) => {
  router[action]('/employees/:id?', controllerFunc);
};

// Create dynamic CRUD routes
createCRUDRoute('get', employeeController.getAllEmployees);
createCRUDRoute('put', employeeController.updateEmployeeById);
createCRUDRoute('delete', employeeController.deleteEmployeeById);

module.exports = router;