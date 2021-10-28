require('dotenv').config();

const GuideSchedule = require("../../../models/guideworkschedule.model")
const { GuideScheduleStatus, PeriodStatus } = require('../../../Db/db.json')

const moment = require('moment')

exports.GuideScheduleQuery = {
    Query: {
        getAllGuideschedule: async () => {
            try {
                return await GuideSchedule.find()
            } catch (error) {
                console.log(error)
            }
        },
        getGuideschedule: async (_, args) => {
            const { _id } = args
            try {
                return await GuideSchedule.findById(_id)
            } catch (error) {
                console.log(error)
            }

        },
        getAllGuidescheduleByGuide: async (_, args) => {
            const { GuideId } = args
            try {
                return await GuideSchedule.find({
                    Createdby: GuideId,
                    ScheduleDate: {
                        $gte: moment(Date.now()).add(1, 'd').startOf('day').format(),
                        $lte: moment(Date.now()).add(15, 'd').endOf('day').format()
                    }
                });
            } catch (error) {
                throw error
            }
        },
        getRequestedGuideschedule: async (_, args) => {
            const { GuideId } = args;
            try {
                return await GuideSchedule.find({
                    Createdby: GuideId,
                    ScheduleDate: { $gte: Date.now(), $lte: moment(Date.now()).add(14, 'd').format() },
                    $or: [{
                        ScheduleMorningStatus: {
                            Tag: GuideScheduleStatus[1]
                        },
                    }, {
                        ScheduleAfternoonStatus: {
                            Tag: GuideScheduleStatus[1]
                        }
                    }],

                })
            } catch (error) {
                throw error
            }

        }
    }
}