const Building = require('../../models/building.model')
const Department = require('../../models/department.model')

const { dateresolver } = require("../../helpers/index")

exports.HospitalResolver = {
    Hospital: {
        Building: async ({ Building:id }) => {
            try {

                return await Building.find({
                    '_id': { $in: id }
                });

            } catch (error) {
                throw error
            }
        },
        Department: async ({ Department:id }) => {
            try {
                
                return await Department.find({
                    '_id': { $in: id }
                });

            } catch (error) {
                throw error
            }
        },
        CreatedAt: ({ CreatedAt }) => {
            return dateresolver(CreatedAt)
        },
        UpdatedAt: ({ UpdatedAt }) => {
            return dateresolver(UpdatedAt)
        },
    },
}