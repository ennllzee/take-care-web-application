require('dotenv').config();

const Building = require('../../../models/building.model')
const Department = require('../../../models/department.model')
const Hospital = require('../../../models/hospital.model')


exports.BuildingMutation = {
    Mutation: {
        createBuilding: async (_, args) => {
            const {
                Name,
                Hospital: HospitalId
            } = args.input;

            const exist = await Building.findOne({ Name })
            if (exist) throw new Error('Already exist building')

            try {
                const buildingNew = new Building({
                    Name,
                    Hospital: HospitalId
                })
                await buildingNew.save();

                await Hospital.findByIdAndUpdate(
                    HospitalId,
                    { "$push": { "Building": buildingNew._doc._id } },
                    { new: true }
                );
                return buildingNew

            } catch (error) {
                throw error
            }


        },
        deleteBuilding: async (parent, args, context, info) => {
            const { _id } = args;

            try {
                const deletedbuilding = await Building.findByIdAndDelete(_id);

                await Department.deleteMany({ BuildingId: _id });

                await Hospital.findByIdAndUpdate(
                    deletedbuilding._doc.HospitalId,
                    { "$pull": { "Building": _id } },
                    { new: true }
                );

                return deletedbuilding
            } catch (error) {
                throw error
            }
        },
        updateBuilding: async (parent, args, context, info) => {
            const { _id } = args
            const {
                Name,
                BuildingId,
            } = args.updateinput;

            try {
                const UpdatedBuilding = await Building.findByIdAndUpdate(
                    _id,
                    {
                        Name,
                        BuildingId,
                    },
                    { new: true }
                )
                return UpdatedBuilding
            } catch (error) {
                throw error
            }


        },
    }
}