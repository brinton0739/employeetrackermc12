const Department = require('./department');
const Role = require('./role');
const Employee = require('./employee');

Employee.belongsTo(Employee, {
    foreignKey: 'manager_id',
    as: 'manager'
});

Role.hasOne(Employee, {
    foreignKey: 'role_id'
});

Employee.belongsTo(Role);

Department.hasOne(Role, {
    foreignKey: 'department_id'
});

Role.belongsTo(Department);


module.exports = { Department, Role, Employee };