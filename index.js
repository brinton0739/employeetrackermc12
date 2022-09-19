const inquirer = require('inquirer');
const consoleTable = require('console.table');
const sequelize = require('./config/connection');
const { getDepartments, addDepartment } = require('./controller/department');
const { getRoles, addRole } = require('./controller/role');
const { getEmployees, addEmployee, updateEmployeeRole } = require('./controller/employee')

const OPTIONS = ['view all departments',
    'view all roles',
    'view all employees',
    'add a department',
    'add a role',
    'add an employee',
    'update an employee role']

const homeScreen = async () => {
    const response = await inquirer
    .prompt([
        {
            type: 'list',
            name: 'homeScreen',
            message: 'What would you like to do?',
            choices: OPTIONS
        }
    ])
    return response;
}

const init = async () => {
    while (true) {
        const choice = await homeScreen();
        switch(choice.homeScreen) {
            case 'view all departments':
                const departments = await getDepartments();
                const res = consoleTable.getTable(departments);
                console.log(res);
                break;
            case 'view all roles':
                const roles = await getRoles();
                const resRole = consoleTable.getTable(roles);
                console.log(resRole);
                break;
            case 'view all employees':
                const employees = await getEmployees();
                const resEmployees = consoleTable.getTable(employees);
                console.log(resEmployees);
                break;
            case 'add a department':
                await addDepartment();
                break;
            case 'add a role':
                await addRole();
                break;
            case 'add an employee':
                await addEmployee();
                break;
            case 'update an employee role':
                await updateEmployeeRole();
                break;
        }
    }
}

sequelize.sync({force: false}).then(() => {
    init();
});