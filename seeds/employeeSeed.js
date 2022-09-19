const { Employee } = require('../model/')

const employeeData = [
    {
        first_name: "joe",
        last_name:"bellinger",
        role_id: 1,
    
    },
    {
        first_name: "jill",
        last_name:"strisand",
        role_id: 2,
        manager_id: 1,
    }
]

const seedEmployee = () => Employee.bulkCreate(employeeData);

module.exports = seedEmployee;