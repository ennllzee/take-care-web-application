require('dotenv').config();

const Report = require('../../../models/report.model')

exports.ReportQuery = {
    Query: {
        getAllReport: async () => {
            try {
                return await Report.find()
            } catch (error) {
                throw error
            }

        },
        getRequestReport: async () => {
            try {
                return await Report.find({ ResponseByAdmin: null })
            } catch (error) {
                throw error
            }

        },
    }
}