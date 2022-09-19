const { Employee, Role } = require('../model');
const inquirer = require('inquirer');
// getEmployees
const getEmployees = async () => {
    const [results, metadata] = await Employee.sequelize.query(
        `select e.first_name, e.last_name, concat(m.first_name, " ", m.last_name) as manager, r.title, r.salary, d.name as department
         from employee e
         left join employee m on e.manager_id = m.id
         join role r on r.id = e.role_id
         join department d on d.id = r.department_id;`
    );
    if(results) {
        return results.map((r) => {
            return r;
        });
    } else {
        return [];
    }
};

// createEmployee
const addEmployee = async () => {
    // lets get all the roles for the role choice
    const rResults = await Role.findAll();
    let roles = [];
    if(rResults) {
        roles = rResults.map((r) => {
            return r.get({plain: true});
        })
    }
    const roleTitles = roles.map((r) => {
        return r.title;
    })

    // lets get all the employees for the manager choice
    const eResults = await Employee.findAll();
    let employees = [];
    if(eResults) {
        employees = eResults.map((e) => {
            return e.get({plain: true});
        })
    }
    const employeeNames = employees.map((e) => {
        return e.first_name + ' ' + e.last_name;
    })

    const {id, first_name, last_name, roleTitle, managerName } = await inquirer
    .prompt([
        {
            type: 'input',
            name: 'first_name',
            message: `Enter the employee's first name`,
        },
        {
            type: 'input',
            name: 'last_name',
            message: `Enter the employee's last name`,
        },
        {
            type: 'list',
            name: 'roleTitle',
            message: `Select a role`,
            choices: roleTitles
        },
        {
            type: 'list',
            name: 'managerName',
            message: `Select a manager`,
            choices: ['none', ...employeeNames]
        }
    ])

    const saveRole = roles.filter(r => r.title === roleTitle);
    console.log(saveRole);
    const saveManager = employees.filter((e) => {
        const eName = e.first_name + ' ' + e.last_name;
        return eName === managerName;
    });

    await Employee.create({
        first_name: first_name,
        last_name: last_name,
        role_id: saveRole[0].id,
        manager_id: saveManager.length === 0 ? null : saveManager[0].id
    });
}

// update employee role

const updateEmployeeRole = async () => {
    // lets get all the roles for the role choice
    const rResults = await Role.findAll();
    let roles = [];
    if(rResults) {
        roles = rResults.map((r) => {
            return r.get({plain: true});
        })
    }
    const roleTitles = roles.map((r) => {
        return r.title;
    })

    // lets get all the employees for the manager choice
    const eResults = await Employee.findAll();
    let employees = [];
    if(eResults) {
        employees = eResults.map((e) => {
            return e.get({plain: true});
        })
    }
    const employeeNames = employees.map((e) => {
        return e.first_name + ' ' + e.last_name;
    })

    const {employeeName, roleTitle} = await inquirer
    .prompt([
        {
            type: 'list',
            name: 'employeeName',
            message: `Select an employee to update`,
            choices: employeeNames
        },
        {
            type: 'list',
            name: 'roleTitle',
            message: `Select a role`,
            choices: roleTitles
        }
    ])

    const saveRole = roles.filter(r => r.title === roleTitle);
    const saveEmployee = employees.filter((e) => {
        const eName = e.first_name + ' ' + e.last_name;
        return eName === employeeName;
    });

    await Employee.update({
        role_id: saveRole[0].id
    }, {where: {id: saveEmployee[0].id}});
}

module.exports = { getEmployees, addEmployee, updateEmployeeRole };