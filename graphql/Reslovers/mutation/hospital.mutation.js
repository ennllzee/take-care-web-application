require('dotenv').config();

const Building = require('../../../models/building.model')
const Department = require('../../../models/department.model')
const Hospital = require('../../../models/hospital.model')

exports.HospitalMutation = {
    Mutation: {
        createHospital: async (_, args) => {
            const {
                Name,
                Address
            } = args.input;

            try {
                const hospitalNew = new Hospital({
                    Name,
                    Address
                })
                await hospitalNew.save();
                return hospitalNew;
            } catch (error) {
                throw error
            }


        },
        //⛔ DELETE NOT WORK AT NOW
        deleteHospital: async (_, args) => {
            const { _id } = args;

            try {
                const deletedhsopital = await Hospital.findByIdAndDelete(_id);

                await Building.deleteMany({ HospitalId: _id });
                await Department.deleteMany({ HospitalId: _id });

                return deletedhsopital;
            } catch (error) {
                throw error
            }

        },
        updateHospital: async (parent, args, context, info) => {
            const { _id } = args
            const {
                Name,
                Address
            } = args.updateinput;

            try {
                const UpdatedHospital = await Hospital.findByIdAndUpdate(
                    _id,
                    {
                        Name,
                        Address,
                    },
                    { new: true }
                )
                return UpdatedHospital;
            } catch (error) {
                throw error
            }


        },
        
    }
}