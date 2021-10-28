require('dotenv').config();

const Status = require('../../../Db/db.json')

exports.StatusQuery = {
    Query: {
        getAppointmentStatus: () => {
            return Status.AppointmentStatus
        },
        getGuideStatus: () => {
            return Status.GuideStatus
        },

    }
}