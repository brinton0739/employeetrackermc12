const { Role } = require('../model/')

const roleData = [
    {
        title: "bossman",
        salary: 800000,
        department_id: 1,
    },
    {
        title: "bosswoman",
        salary: 800001,
        department_id: 2,
    }
]

const seedRole = () => Role.bulkCreate(roleData);

module.exports = seedRole;