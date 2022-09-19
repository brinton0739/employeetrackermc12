const { Role, Department } = require('../model');
const inquirer = require('inquirer');

// getRoles
const getRoles = async () => {
    const [results, metadata] = await Role.sequelize.query(
        `select title, salary, d.name as department
         from role r
         join department d on d.id = r.department_id;`
    );
    if(results) {
        console.log(results)
        return results.map((r) => {
            return r;
        });
    } else {
        return [];
    }
};

// createRole
const addRole = async () => {
    const results = await Department.findAll();
    let departments = [];
    if(results) {
        departments = results.map((r) => {
            return r.get({plain: true});
        })
    }
    const departmentNames = departments.map((d) => {
        return d.name;
    })
    const {title, salary, department } = await inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: `Enter a title`,
        },
        {
            type: 'input',
            name: 'salary',
            message: `Enter role's salary`,
        },
        {
            type: 'list',
            name: 'department',
            message: `choose a department for this role`,
            choices: departmentNames
        }
    ])

    const saveDepartment = departments.filter(d => d.name === department)
    await Role.create({
        title: title,
        salary: salary,
        department_id: saveDepartment[0].id
    });
}

module.exports = { getRoles , addRole };