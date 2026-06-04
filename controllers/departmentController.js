// Department controller
const models = require('../models');

// Get all departments
const getAllDepartments = async (req, res) => {
  try {
    const departments = await models.Department.findAll({
      include: [
        {
          model: models.Position,
          as: 'positions'
        }
      ]
    });
    
    res.json({ departments });
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
};

// Get department by ID
const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await models.Department.findByPk(id, {
      include: [
        {
          model: models.Position,
          as: 'positions'
        }
      ]
    });
    
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    
    res.json({ department });
  } catch (error) {
    console.error('Error fetching department:', error);
    res.status(500).json({ error: 'Failed to fetch department' });
  }
};

// Create new department
const createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Check if department already exists
    const existingDepartment = await models.Department.findOne({ where: { name } });
    if (existingDepartment) {
      return res.status(400).json({ error: 'Department with this name already exists' });
    }
    
    const department = await models.Department.create({
      name,
      description
    });
    
    res.status(201).json({ message: 'Department created successfully', department });
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({ error: 'Failed to create department' });
  }
};

// Update department
const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    
    const department = await models.Department.findByPk(id);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    
    // Check if another department with the same name exists
    if (name) {
      const existingDepartment = await models.Department.findOne({ 
        where: { name } 
      });
      if (existingDepartment && existingDepartment.id !== parseInt(id)) {
        return res.status(400).json({ error: 'Department with this name already exists' });
      }
    }
    
    await department.update({
      name,
      description
    });
    
    res.json({ message: 'Department updated successfully', department });
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({ error: 'Failed to update department' });
  }
};

// Delete department
const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const department = await models.Department.findByPk(id);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    
    // Check if department has positions
    const positions = await models.Position.count({ 
      where: { department_id: id } 
    });
    
    if (positions > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete department with existing positions. Please reassign or delete positions first.' 
      });
    }
    
    await department.destroy();
    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ error: 'Failed to delete department' });
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment
};