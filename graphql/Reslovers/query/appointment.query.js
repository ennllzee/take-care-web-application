require('dotenv').config();

const GuideSchedule = require("../../../models/guideworkschedule.model")
const Appointment = require('../../../models/appointment.model')
const RecordTitle = require('../../../models/recordkeyword.model')
const Guide = require('../../../models/guide.model')

const moment = require('moment')

const { moringorafternoon } = require("../../../helpers/index")
const { AppointmentStatus, PeriodStatus } = require('../../../Db/db.json')

exports.AppointmentQuery = {
    Query: {
        getAllAppointment: async (_, args) => {
            const { CustomerId, GuideId, DateAt } = args

            try {

                // Delete when appointment non active
                await Appointment.deleteMany({
                    AppointTime: { $lte: moment(Date.now()).subtract(1, 'd').format() },
                    BeginTime: null,
                })

                // Update to EXPIRED when confirm guide not come  
                await Appointment.updateMany({
                    AppointTime: { $lte: moment(Date.now()).subtract(1, 'h').format() },
                    BeginTime: null,
                }, {
                    Status: {
                        Tag: AppointmentStatus[5],
                        Details: null
                    },
                })

                // Update to Complete when guide not click CompleteService  
                await Appointment.updateMany({
                    AppointTime: { $lte: moment(Date.now()).subtract(1, 'd').format() },
                    $and: [
                        { BeginTime: { $ne: null } },
                        { EndTime: null }
                    ],
                }, {
                    Status: {
                        Tag: AppointmentStatus[4],
                        Details: "Guide doesnt press Complete Service 😅"
                    },
                })

                if (CustomerId !== undefined) {
                    return await Appointment.find({ Customer: CustomerId });
                } else if (GuideId !== undefined) {
                    return await Appointment.find({ Guide: GuideId });
                } else if (DateAt !== undefined) {
                    const Dateformated = getonlydate(DateAt)
                    return await Appointment.find({ AppointTime: { $gte: Dateformated, $lte: moment(Dateformated).add(1, 'd').format() } });
                } else {
                    return await Appointment.find();
                }
            } catch (error) {
                console.log(error)
            }

        },
        getAllAppointmentByCustomer: async (_, args) => {
            const { CustomerId } = args

            try {

                // Delete when appointment non active
                await Appointment.deleteMany({
                    AppointTime: { $lte: moment(Date.now()).subtract(1, 'd').format() },
                    BeginTime: null,
                })

                // Update to EXPIRED when confirm guide not come  
                await Appointment.updateMany({
                    AppointTime: { $lte: moment(Date.now()).subtract(1, 'h').format() },
                    BeginTime: null,
                }, {
                    Status: {
                        Tag: AppointmentStatus[5],
                        Details: null
                    },
                })

                // Update to Complete when guide not click CompleteService  
                await Appointment.updateMany({
                    AppointTime: { $lte: moment(Date.now()).subtract(1, 'd').format() },
                    $and: [
                        { BeginTime: { $ne: null } },
                        { EndTime: null }
                    ],
                }, {
                    Status: {
                        Tag: AppointmentStatus[4],
                        Details: "Guide doesnt press Complete Service 😅"
                    },
                })



                return await Appointment.find({ Customer: CustomerId }).sort({ AppointTime: -1 });

            } catch (error) {
                console.log(error)
            }

        },
        getAllAppointmentByGuide: async (_, args) => {
            const { GuideId } = args
            try {

                // Delete when appointment non active
                await Appointment.deleteMany({
                    AppointTime: { $lte: moment(Date.now()).subtract(1, 'd').format() },
                    BeginTime: null,
                })

                // Update to EXPIRED when confirm guide not come  
                await Appointment.updateMany({
                    AppointTime: { $lte: moment(Date.now()).subtract(1, 'h').format() },
                    BeginTime: null,
                }, {
                    Status: {
                        Tag: AppointmentStatus[5],
                        Details: null
                    },
                })

                // Update to Complete when guide not click CompleteService  
                await Appointment.updateMany({
                    AppointTime: { $lte: moment(Date.now()).subtract(1, 'd').format() },
                    $and: [
                        { BeginTime: { $ne: null } },
                        { EndTime: null }
                    ],
                }, {
                    Status: {
                        Tag: AppointmentStatus[4],
                        Details: "Guide doesnt press Complete Service 😅"
                    },
                })

                return await Appointment.find({ Guide: GuideId }).sort({ AppointTime: 1 });
            } catch (error) {
                console.log(error)
            }

        },
        getAppointment: async (_, args) => {
            const { _id } = args
            try {
                return await Appointment.findById(_id);
            } catch (error) {
                throw error
            }

        },
        getAvailableGuide: async (_, args) => {
            const { Date, Period } = args
            if (moment(Date, moment.ISO_8601).isBefore(moment())) throw new Error('Cannot enter past time')
            const DATE_F = moment(Date, moment.ISO_8601).startOf('day')

            try {

                let queryGuideSchedule

                if (Period === PeriodStatus[2]) {
                    queryGuideSchedule = await GuideSchedule.find({
                        ScheduleDate: {
                            $gte: DATE_F.toDate(),
                            $lte: moment(DATE_F).endOf('day').toDate()
                        },
                        AvailableMorning: true,
                        AvailableAfternoon: true,
                    })
                } else if (Period === PeriodStatus[1]) {
                    queryGuideSchedule = await GuideSchedule.find({
                        ScheduleDate: {
                            $gte: DATE_F.toDate(),
                            $lte: moment(DATE_F).endOf('day').toDate()
                        },
                        AvailableAfternoon: true,
                    })
                } else if (Period === PeriodStatus[0]) {
                    queryGuideSchedule = await GuideSchedule.find({
                        ScheduleDate: {
                            $gte: DATE_F.toDate(),
                            $lte: moment(DATE_F).endOf('day').toDate()
                        },
                        AvailableMorning: true,
                    })
                }

                if (!queryGuideSchedule) throw new Error('Not Found any Available Guide')

                async function CheckisNewGuide(_id) {
                    const findAppoint = await Appointment.findOne({ Guide: _id, Review: { $ne: null } })
                    if (findAppoint) return false
                    return true
                }

                if (queryGuideSchedule.length <= 5) {
                    return queryGuideSchedule
                } 
                let Filtered = await Promise.all(queryGuideSchedule.map(async (data) => {
                    let guideData = await Guide.findById(data.Createdby);
                    let check = await CheckisNewGuide(data.Createdby)
                    return { ...data._doc, Rating: guideData.Rating, NewGuide: check, VerifyDate: guideData.VerifyDate }
                }))

                const NEWGUIDE = Filtered.filter((data) => data.NewGuide === true).sort((a, b) => a.VerifyDate - b.VerifyDate)
                const RAITINGGUIDE = Filtered.filter((data) => data.NewGuide === false).sort((a, b) => b.Rating - a.Rating)

                let RETURNSCHEDULE = []

                if (RAITINGGUIDE.length >= 3 && NEWGUIDE.length >= 2) {
                    for (let i = 0; i < 3; i++) {
                        RETURNSCHEDULE.push(RAITINGGUIDE[i])
                    }
                    for (let i = 0; i < 2; i++) {
                        RETURNSCHEDULE.push(NEWGUIDE[i])
                    }
                }else if (RAITINGGUIDE.length < 3){
                    for (let i = 0; i < RAITINGGUIDE.length; i++) {
                        RETURNSCHEDULE.push(RAITINGGUIDE[i])
                    }
                    const TotalAvailable = 5 - RETURNSCHEDULE.length;
                    for (let i = 0; i < TotalAvailable; i++) {
                        RETURNSCHEDULE.push(NEWGUIDE[i])
                    }
                }else if (NEWGUIDE.length < 2){
                    for (let i = 0; i < NEWGUIDE.length; i++) {
                        RETURNSCHEDULE.push(NEWGUIDE[i])
                    }
                    const TotalAvailable = 5 - RETURNSCHEDULE.length;
                    for (let i = 0; i < TotalAvailable; i++) {
                        RETURNSCHEDULE.push(RAITINGGUIDE[i])
                    }
                }
                return RETURNSCHEDULE

            } catch (error) {
                throw error
            }
        },
        getAllRecordTitles: async (_, args) => {
            return await RecordTitle.find()
        }
    }
}