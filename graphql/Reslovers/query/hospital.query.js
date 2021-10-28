require('dotenv').config();

const Hospital = require('../../../models/hospital.model')

exports.HospitalQuery = {
    Query: {
        getAllHospital: async () => {
            try {
                return await Hospital.find();
            } catch (error) {
                console.log(error)
            }

        },
        getHospital: async (parent, args, context, info) => {
            const { _id } = args
            try {
                return await Hospital.findById(_id)
            } catch (error) {
                console.log(error)
            }

        },
    }
}