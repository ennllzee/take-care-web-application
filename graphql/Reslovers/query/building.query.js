require('dotenv').config();

const Building = require('../../../models/building.model')

exports.BuildingQuery = {
    Query: {
        getAllBuilding: async () => {
            try {
                return await Building.find();
            } catch (error) {
                console.log(error)
            }

        },
        getBuilding: async (parent, args, context, info) => {
            const { _id } = args
            try {
                return await Building.findById(_id)
            } catch (error) {
                console.log(error)
            }

        },
    }
}