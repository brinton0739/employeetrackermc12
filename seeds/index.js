const seedDepartment = require('./departmentSeed');
const seedEmployee = require('./employeeSeed');
const seedRole = require('./roleSeed');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({force: false});
    console.log('\n--- DB SYNCED ---\n');
    await seedDepartment();
    await seedRole();
    await seedEmployee();
    console.log('\n--- DB SEEDED ---\n')
    process.exit(0);
};

seedAll();