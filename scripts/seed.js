// Database Seeding Script
// This script populates the database with initial data for the Bold Path HR application

const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const config = require('../config/database')['development'];
const models = require('../models');

console.log('=========================================');
console.log('Bold Path HR Database Seeding Script');
console.log('=========================================');

// Initialize Sequelize
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Sample data
const sampleData = {
  users: [
    {
      email: 'admin@boldpathhr.com',
      password: 'Admin123!',
      role: 'admin',
      isVerified: true,
      isActive: true
    },
    {
      email: 'hrmanager@boldpathhr.com',
      password: 'HrManager123!',
      role: 'hr_manager',
      isVerified: true,
      isActive: true
    },
    {
      email: 'employee@boldpathhr.com',
      password: 'Employee123!',
      role: 'employee',
      isVerified: true,
      isActive: true
    }
  ],
  
  employees: [
    {
      firstName: 'Sarah',
      lastName: 'Johnson',
      position: 'HR Manager',
      department: 'Human Resources',
      hireDate: '2020-01-15',
      phone: '+1234567890',
      address: '123 HR Street, New York, NY'
    },
    {
      firstName: 'Michael',
      lastName: 'Rodriguez',
      position: 'Software Engineer',
      department: 'Engineering',
      hireDate: '2021-03-20',
      phone: '+1234567891',
      address: '456 Tech Avenue, San Francisco, CA'
    },
    {
      firstName: 'Emma',
      lastName: 'Patel',
      position: 'Marketing Specialist',
      department: 'Marketing',
      hireDate: '2022-05-10',
      phone: '+1234567892',
      address: '789 Creative Boulevard, Los Angeles, CA'
    }
  ],
  
  departments: [
    {
      name: 'Human Resources',
      description: 'Responsible for employee relations, recruitment, and HR policies'
    },
    {
      name: 'Engineering',
      description: 'Software development, system architecture, and technical operations'
    },
    {
      name: 'Marketing',
      description: 'Brand management, advertising, and customer engagement'
    },
    {
      name: 'Sales',
      description: 'Customer acquisition, relationship management, and revenue generation'
    },
    {
      name: 'Finance',
      description: 'Financial planning, accounting, and budget management'
    }
  ],
  
  positions: [
    {
      title: 'HR Manager',
      department: 'Human Resources',
      description: 'Oversees human resources operations and employee relations'
    },
    {
      title: 'Software Engineer',
      department: 'Engineering',
      description: 'Develops and maintains software applications'
    },
    {
      title: 'Marketing Specialist',
      department: 'Marketing',
      description: 'Creates and executes marketing campaigns'
    },
    {
      title: 'Sales Representative',
      department: 'Sales',
      description: 'Manages customer relationships and drives sales'
    },
    {
      title: 'Financial Analyst',
      department: 'Finance',
      description: 'Analyzes financial data and prepares reports'
    }
  ]
};

// Function to seed users
async function seedUsers() {
  console.log('Seeding users...');
  
  for (const userData of sampleData.users) {
    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      
      // Create user
      const user = await models.User.create({
        email: userData.email,
        passwordHash: hashedPassword,
        role: userData.role,
        isVerified: userData.isVerified,
        isActive: userData.isActive
      });
      
      console.log(`✓ Created user: ${userData.email}`);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        console.log(`⚠ User already exists: ${userData.email}`);
      } else {
        console.error(`✗ Error creating user ${userData.email}:`, error.message);
      }
    }
  }
}

// Function to seed departments
async function seedDepartments() {
  console.log('Seeding departments...');
  
  for (const deptData of sampleData.departments) {
    try {
      const department = await models.Department.findOrCreate({
        where: { name: deptData.name },
        defaults: deptData
      });
      
      if (department[1]) {
        console.log(`✓ Created department: ${deptData.name}`);
      } else {
        console.log(`⚠ Department already exists: ${deptData.name}`);
      }
    } catch (error) {
      console.error(`✗ Error creating department ${deptData.name}:`, error.message);
    }
  }
}

// Function to seed positions
async function seedPositions() {
  console.log('Seeding positions...');
  
  // Get department IDs
  const departments = await models.Department.findAll();
  const deptMap = {};
  departments.forEach(dept => {
    deptMap[dept.name] = dept.id;
  });
  
  for (const posData of sampleData.positions) {
    try {
      // Get department ID
      const departmentId = deptMap[posData.department];
      
      if (!departmentId) {
        console.error(`✗ Department not found for position: ${posData.title}`);
        continue;
      }
      
      const position = await models.Position.findOrCreate({
        where: { title: posData.title },
        defaults: {
          ...posData,
          departmentId: departmentId
        }
      });
      
      if (position[1]) {
        console.log(`✓ Created position: ${posData.title}`);
      } else {
        console.log(`⚠ Position already exists: ${posData.title}`);
      }
    } catch (error) {
      console.error(`✗ Error creating position ${posData.title}:`, error.message);
    }
  }
}

// Function to seed employees
async function seedEmployees() {
  console.log('Seeding employees...');
  
  // Get users
  const users = await models.User.findAll();
  
  // Get positions
  const positions = await models.Position.findAll();
  const posMap = {};
  positions.forEach(pos => {
    posMap[pos.title] = pos.id;
  });
  
  for (let i = 0; i < sampleData.employees.length; i++) {
    const empData = sampleData.employees[i];
    
    try {
      // Get user ID (match by role)
      const user = users.find(u => u.role === sampleData.users[i].role);
      
      if (!user) {
        console.error(`✗ User not found for employee: ${empData.firstName} ${empData.lastName}`);
        continue;
      }
      
      // Get position ID
      const positionId = posMap[empData.position];
      
      if (!positionId) {
        console.error(`✗ Position not found for employee: ${empData.firstName} ${empData.lastName}`);
        continue;
      }
      
      const employee = await models.Employee.findOrCreate({
        where: { userId: user.id },
        defaults: {
          ...empData,
          userId: user.id,
          positionId: positionId
        }
      });
      
      if (employee[1]) {
        console.log(`✓ Created employee: ${empData.firstName} ${empData.lastName}`);
      } else {
        console.log(`⚠ Employee already exists: ${empData.firstName} ${empData.lastName}`);
      }
    } catch (error) {
      console.error(`✗ Error creating employee ${empData.firstName} ${empData.lastName}:`, error.message);
    }
  }
}

// Function to seed attendance records
async function seedAttendance() {
  console.log('Seeding attendance records...');
  
  // Get employees
  const employees = await models.Employee.findAll();
  
  // Create sample attendance records for the past week
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Skip weekends
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;
    
    for (const employee of employees) {
      try {
        // Random clock in/out times
        const clockInHour = 8 + Math.floor(Math.random() * 2);
        const clockOutHour = 17 + Math.floor(Math.random() * 2);
        
        const attendance = await models.Attendance.findOrCreate({
          where: {
            employeeId: employee.id,
            date: date.toISOString().split('T')[0]
          },
          defaults: {
            employeeId: employee.id,
            date: date.toISOString().split('T')[0],
            clockIn: `${clockInHour}:00:00`,
            clockOut: `${clockOutHour}:00:00`,
            status: 'present'
          }
        });
        
        if (attendance[1]) {
          console.log(`✓ Created attendance record for ${employee.firstName} ${employee.lastName} on ${date.toISOString().split('T')[0]}`);
        }
      } catch (error) {
        console.error(`✗ Error creating attendance record:`, error.message);
      }
    }
  }
}

// Function to seed leave requests
async function seedLeave() {
  console.log('Seeding leave requests...');
  
  // Get employees
  const employees = await models.Employee.findAll();
  
  // Create sample leave requests
  const leaveTypes = ['vacation', 'sick', 'personal'];
  
  for (const employee of employees) {
    try {
      // Create 1-3 leave requests per employee
      const numRequests = 1 + Math.floor(Math.random() * 3);
      
      for (let i = 0; i < numRequests; i++) {
        const leaveType = leaveTypes[Math.floor(Math.random() * leaveTypes.length)];
        const status = ['pending', 'approved', 'rejected'][Math.floor(Math.random() * 3)];
        
        // Random dates
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30));
        
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 5) + 1);
        
        const leaveRequest = await models.LeaveRequest.create({
          employeeId: employee.id,
          leaveType: leaveType,
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          reason: `Sample ${leaveType} request`,
          status: status
        });
        
        console.log(`✓ Created ${status} ${leaveType} request for ${employee.firstName} ${employee.lastName}`);
      }
    } catch (error) {
      console.error(`✗ Error creating leave request:`, error.message);
    }
  }
}

// Main seeding function
async function seed() {
  try {
    console.log('Starting database seeding...');
    
    // Sync models
    await sequelize.sync({ alter: true });
    console.log('✓ Database synced');
    
    // Seed data
    await seedUsers();
    await seedDepartments();
    await seedPositions();
    await seedEmployees();
    await seedAttendance();
    await seedLeave();
    
    console.log('');
    console.log('=========================================');
    console.log('Database seeding completed successfully!');
    console.log('=========================================');
  } catch (error) {
    console.error('Error during seeding:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  seed();
}

module.exports = {
  seed,
  seedUsers,
  seedDepartments,
  seedPositions,
  seedEmployees,
  seedAttendance,
  seedLeave
};