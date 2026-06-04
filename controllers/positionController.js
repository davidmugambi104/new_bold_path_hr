// Position controller
const models = require('../models');

// Get all positions
const getAllPositions = async (req, res) => {
  try {
    const positions = await models.Position.findAll({
      include: [
        {
          model: models.Department,
          as: 'department'
        }
      ]
    });
    
    res.json({ positions });
  } catch (error) {
    console.error('Error fetching positions:', error);
    res.status(500).json({ error: 'Failed to fetch positions' });
  }
};

// Get position by ID
const getPositionById = async (req, res) => {
  try {
    const { id } = req.params;
    const position = await models.Position.findByPk(id, {
      include: [
        {
          model: models.Department,
          as: 'department'
        }
      ]
    });
    
    if (!position) {
      return res.status(404).json({ error: 'Position not found' });
    }
    
    res.json({ position });
  } catch (error) {
    console.error('Error fetching position:', error);
    res.status(500).json({ error: 'Failed to fetch position' });
  }
};

// Create new position
const createPosition = async (req, res) => {
  try {
    const { title, department_id, description, requirements } = req.body;
    
    // Check if position already exists
    const existingPosition = await models.Position.findOne({ where: { title } });
    if (existingPosition) {
      return res.status(400).json({ error: 'Position with this title already exists' });
    }
    
    // Check if department exists
    if (department_id) {
      const department = await models.Department.findByPk(department_id);
      if (!department) {
        return res.status(400).json({ error: 'Department not found' });
      }
    }
    
    const position = await models.Position.create({
      title,
      department_id,
      description,
      requirements
    });
    
    res.status(201).json({ message: 'Position created successfully', position });
  } catch (error) {
    console.error('Error creating position:', error);
    res.status(500).json({ error: 'Failed to create position' });
  }
};

// Update position
const updatePosition = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, department_id, description, requirements } = req.body;
    
    const position = await models.Position.findByPk(id);
    if (!position) {
      return res.status(404).json({ error: 'Position not found' });
    }
    
    // Check if another position with the same title exists
    if (title) {
      const existingPosition = await models.Position.findOne({ 
        where: { title } 
      });
      if (existingPosition && existingPosition.id !== parseInt(id)) {
        return res.status(400).json({ error: 'Position with this title already exists' });
      }
    }
    
    // Check if department exists
    if (department_id) {
      const department = await models.Department.findByPk(department_id);
      if (!department) {
        return res.status(400).json({ error: 'Department not found' });
      }
    }
    
    await position.update({
      title,
      department_id,
      description,
      requirements
    });
    
    res.json({ message: 'Position updated successfully', position });
  } catch (error) {
    console.error('Error updating position:', error);
    res.status(500).json({ error: 'Failed to update position' });
  }
};

// Delete position
const deletePosition = async (req, res) => {
  try {
    const { id } = req.params;
    
    const position = await models.Position.findByPk(id);
    if (!position) {
      return res.status(404).json({ error: 'Position not found' });
    }
    
    await position.destroy();
    res.json({ message: 'Position deleted successfully' });
  } catch (error) {
    console.error('Error deleting position:', error);
    res.status(500).json({ error: 'Failed to delete position' });
  }
};

module.exports = {
  getAllPositions,
  getPositionById,
  createPosition,
  updatePosition,
  deletePosition
};