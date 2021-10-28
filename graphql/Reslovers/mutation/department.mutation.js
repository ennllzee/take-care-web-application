require('dotenv').config();

const Building = require('../../../models/building.model')
const Department = require('../../../models/department.model')
const Hospital = require('../../../models/hospital.model')


exports.DepartmentMutation = {
    Mutation: {
        createDepartment: async (parent, args, context, info) => {
            const {
                Name,
                Building: BuildingId, //ReNamed
            } = args.input;

            const exist = await Department.findOne({Name, Building: BuildingId})
            if (exist) throw new Error('Already exist department')

            try {
                const fetchHospital = await Hospital.findOne(
                    { 'Building': { $in: BuildingId } }
                );

                const departmentNew = new Department({
                    Name,
                    Building: BuildingId,
                    Hospital: fetchHospital.id
                })

                await departmentNew.save();

                await Building.findByIdAndUpdate(
                    BuildingId,
                    { "$push": { "Department": departmentNew._doc._id } },
                    { new: true }
                );

                await Hospital.findByIdAndUpdate(
                    fetchHospital._doc._id,
                    { "$push": { "Department": departmentNew._doc._id } },
                    { new: true }
                );

                return departmentNew
            } catch (error) {
                throw error
            }
        },
        deleteDepartment: async (_, args) => {
            const { _id } = args;

            try {
                const deleteddepartment = await Department.findByIdAndDelete(_id);

                await Hospital.findByIdAndUpdate(
                    deleteddepartment._doc.HospitalId,
                    { "$pull": { "Department": _id } },
                    { new: true }
                );

                await Building.findByIdAndUpdate(
                    deleteddepartment._doc.BuildingId,
                    { "$pull": { "Department": _id } },
                    { new: true }
                );

                return deleteddepartment
            } catch (error) {
                throw error
            }


        },
        updateDepartment: async (parent, args, context, info) => {
            const { _id } = args
            const {
                Name,
                BuildingId,
            } = args.updateinput;

            try {
                const UpdatedDepartment = await Department.findByIdAndUpdate(
                    _id,
                    {
                        Name,
                        BuildingId,
                    },
                    { new: true }
                )
                return UpdatedDepartment
            } catch (error) {
                throw error
            }


        },

    }
}