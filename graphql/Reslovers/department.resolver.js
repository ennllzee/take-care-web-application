const Building = require('../../models/building.model')
const Hospital = require('../../models/hospital.model')

const { dateresolver } = require("../../helpers/index")


exports.DepartmentResolver = {
    Department: {
        Building: async (parent) => {
            try {
                return await Building.findById(parent.Building)
            } catch (error) {
                throw error
            }
        },
        Hospital: async (parent) => {
            try {
                return await Hospital.findById(parent.Hospital)
                
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