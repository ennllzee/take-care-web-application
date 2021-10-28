const Hospital = require('../../models/hospital.model')
const Department = require('../../models/department.model')

const { dateresolver } = require("../../helpers/index")


exports.BuildingResolver = {
  Building: {
    Hospital: async ({ Hospital:HospitalId }) => {
      try {
        return await Hospital.findById(HospitalId)
      } catch (error) {
        throw error
      }
    },
    Department: async ({ Department:DepartmentId }) => {
      try {
        return await Department.find({
          '_id': { $in: DepartmentId }
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