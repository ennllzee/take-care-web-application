require('dotenv').config();

const Department = require('../../../models/department.model')

exports.DepartmentQuery = {
    Query: {
        getAllDepartment: async () => {
            try {
                return await Department.find();
            } catch (error) {
                console.log(error);
            }
        },
        getDepartment: async (parent, args, context, info) => {
            const { _id } = args
            try {
                return await Department.findById(_id)
            } catch (error) {
                console.log(error);
            }
        },
    }
}