const { Department } = require('../model/')

const departmentData = [
    {
        name: "Department 1"
    },
    {
        name: "Department 2"
    }
]

const seedDepartment = () => Department.bulkCreate(departmentData);

module.exports = seedDepartment;