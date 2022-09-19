const { Department } = require('../model')
const inquirer = require('inquirer');

// getDepartments
const getDepartments = async () => {
    const results = await Department.findAll({
        attributes: ['id', 'name']
    });

    if(results) {
        return results.map((r) => {
            return r.get({plain:true});
        });
    } else {
        return [];
    }
};

// createDepartment
const addDepartment = async () => {
    const type = "Department"
    const {name} = await inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: `Enter the ${type}'s name`,
        },
       
    ])

    await Department.create({
        name: name
    });
}

module.exports = { getDepartments , addDepartment };