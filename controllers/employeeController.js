// Employee controller
const models = require('../models');

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await models.Employee.findAll({
      include: [
        {
          model: models.User,
          as: 'user',
          attributes: ['id', 'email', 'role', 'is_active']
        }
      ]
    });
    
    res.json({ employees });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};

// Get employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await models.Employee.findByPk(id, {
      include: [
        {
          model: models.User,
          as: 'user',
          attributes: ['id', 'email', 'role', 'is_active']
        }
      ]
    });
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.json({ employee });
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
};

// Create new employee
const createEmployee = async (req, res) => {
  try {
    const { user_id, first_name, last_name, position, department, hire_date, phone, address } = req.body;
    
    // Check if employee already exists for this user
    const existingEmployee = await models.Employee.findOne({ where: { user_id } });
    if (existingEmployee) {
      return res.status(400).json({ error: 'Employee record already exists for this user' });
    }
    
    const employee = await models.Employee.create({
      user_id,
      first_name,
      last_name,
      position,
      department,
      hire_date,
      phone,
      address
    });
    
    res.status(201).json({ message: 'Employee created successfully', employee });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Failed to create employee' });
  }
};

// Update employee
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, position, department, hire_date, phone, address } = req.body;
    
    const employee = await models.Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    await employee.update({
      first_name,
      last_name,
      position,
      department,
      hire_date,
      phone,
      address
    });
    
    res.json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Failed to update employee' });
  }
};

// Delete employee
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    
    const employee = await models.Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    await employee.destroy();
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Failed to delete employee' });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};