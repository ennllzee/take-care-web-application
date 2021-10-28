require('dotenv').config();
const moment = require('moment')

const Appointment = require('../../../models/appointment.model')
const Guide = require('../../../models/guide.model')
const GuideSchedule = require("../../../models/guideworkschedule.model")
const RecordTitle = require('../../../models/recordkeyword.model')


const {
    AppointmentStatus,
    GuideScheduleStatus,
    PeriodStatus,
    StandardPeriodPrice,
    StandardAllDayPrice,
    ReviewStatRating
} = require('../../../Db/db.json')

exports.AppointmentMutation = {
    Mutation: {
        createAppointment: async (_, args) => {
            const {
                AppointTime,
                CustomerId,
                DepId,
                HospitalId,
                Note,
                Period,
                ScheuleGuideId,
            } = args.input;


            //Check if the Period is correct
            if (Period !== PeriodStatus[0] && Period !== PeriodStatus[1] && Period !== PeriodStatus[2]) {
                throw new Error('Wrong Period input')
            }

            //Check if the appointment already exists
            const DATE_F = moment(AppointTime, moment.ISO_8601).startOf('day')
            const existappointment = await Appointment.findOne({
                Customer: CustomerId,
                AppointTime: {
                    $gte: DATE_F.toDate(),
                    $lte: moment(DATE_F).endOf('day').toDate()
                },
            })
            if (existappointment) return new Error('Cannot create appointment more than one in the same day')

            //Get guide information
            const guide = await GuideSchedule.findById(ScheuleGuideId)

            const getPricebyPeriod = (Period) => {
                if (Period !== PeriodStatus[2]) {
                    return StandardPeriodPrice
                } else {
                    return StandardAllDayPrice
                }
            }

            //Create Appointment 
            const appointment = new Appointment({
                AppointTime,
                Customer: CustomerId,
                Department: DepId,
                Hospital: HospitalId,
                Note,
                Guide: guide._doc.Createdby,
                Period,
                Status: {
                    Tag: AppointmentStatus[0],
                    Details: null
                },
                Price: getPricebyPeriod(Period),

            });

            //Set Status of GuideSchedule
            if (Period === PeriodStatus[0]) {
                await GuideSchedule.findByIdAndUpdate(
                    ScheuleGuideId,
                    {
                        AvailableMorning: false,
                        WorkOnMorningAppointment: appointment._id,
                        ScheduleMorningStatus: {
                            Tag: GuideScheduleStatus[1]
                        }
                    }, { new: true })
            } else if (Period === PeriodStatus[1]) {
                await GuideSchedule.findByIdAndUpdate(
                    ScheuleGuideId,
                    {
                        AvailableAfternoon: false,
                        WorkOnAfternoonAppointment: appointment._id,
                        ScheduleAfternoonStatus: {
                            Tag: GuideScheduleStatus[1]
                        }
                    }, { new: true })
            } else if (Period === PeriodStatus[2]) {
                await GuideSchedule.findByIdAndUpdate(
                    ScheuleGuideId,
                    {
                        AvailableMorning: false,
                        WorkOnMorningAppointment: appointment._id,
                        ScheduleMorningStatus: {
                            Tag: GuideScheduleStatus[1]
                        },
                        AvailableAfternoon: false,
                        WorkOnAfternoonAppointment: appointment._id,
                        ScheduleAfternoonStatus: {
                            Tag: GuideScheduleStatus[1]
                        }
                    }, { new: true })
            }

            return await appointment.save();

        },
        updateAppointmentRequestGuide: async (_, args) => {
            const { _id, ScheduleId, Period } = args;

            try {
                const getguide = await GuideSchedule.findById(ScheduleId)

                //Update New Appointment
                const Updatedappointment = await Appointment.findByIdAndUpdate(
                    _id,
                    {
                        Guide: getguide.Createdby._id,
                        Status: {
                            Tag: AppointmentStatus[0],
                            Details: null
                        }
                    },
                    { new: true }
                )

                //Delete OLD Request
                await GuideSchedule.findOneAndUpdate(
                    { WorkOnMorningAppointment: _id },
                    {
                        AvailableMorning: true,
                        WorkOnMorningAppointment: null,
                        ScheduleMorningStatus: {
                            Tag: GuideScheduleStatus[0]
                        }
                    }, { new: true })
                await GuideSchedule.findOneAndUpdate(
                    { WorkOnAfternoonAppointment: _id },
                    {
                        AvailableAfternoon: true,
                        WorkOnAfternoonAppointment: null,
                        ScheduleAfternoonStatus: {
                            Tag: GuideScheduleStatus[0]
                        }
                    }, { new: true })

                //Make New Request to new GuideSchedule
                if (Period === PeriodStatus[0]) {
                    await GuideSchedule.findByIdAndUpdate(
                        ScheduleId,
                        {
                            AvailableMorning: false,
                            WorkOnMorningAppointment: Updatedappointment._id,
                            ScheduleMorningStatus: {
                                Tag: GuideScheduleStatus[1]
                            }
                        }, { new: true })
                } else if (Period === PeriodStatus[1]) {
                    await GuideSchedule.findByIdAndUpdate(
                        ScheduleId,
                        {
                            AvailableAfternoon: false,
                            WorkOnAfternoonAppointment: Updatedappointment._id,
                            ScheduleAfternoonStatus: {
                                Tag: GuideScheduleStatus[1]
                            }
                        }, { new: true })
                } else if (Period === PeriodStatus[2]) {
                    await GuideSchedule.findByIdAndUpdate(
                        ScheduleId,
                        {
                            AvailableMorning: false,
                            WorkOnMorningAppointment: Updatedappointment._id,
                            ScheduleMorningStatus: {
                                Tag: GuideScheduleStatus[1]
                            },
                            AvailableAfternoon: false,
                            WorkOnAfternoonAppointment: Updatedappointment._id,
                            ScheduleAfternoonStatus: {
                                Tag: GuideScheduleStatus[1]
                            }
                        }, { new: true })
                }

                return Updatedappointment

            } catch (error) {
                throw error
            }


        },
        updateAppointmentBeginTime: async (_, args) => {
            const { _id, BeginTime } = args;
            try {
                const Updatedappointment = await Appointment.findByIdAndUpdate(
                    _id,
                    {
                        BeginTime,
                        Status: {
                            Tag: AppointmentStatus[3],
                            Details: null
                        },
                    },
                    { new: true }
                )
                return Updatedappointment
            } catch (error) {
                throw error
            }
        },
        updateAppointmentEndTime: async (_, args) => {

            const { _id, EndTime } = args;

            const AppointmentDetail = await Appointment.findById(_id)
            const GuideDetail = await Guide.findById(AppointmentDetail.Guide)

            const CalculateTimeDiff = moment(EndTime).diff(moment(AppointmentDetail.BeginTime), 'hours', true)

            const CalculateTotalPrice = Math.floor(AppointmentDetail.Price + (GuideDetail.Tips * CalculateTimeDiff))

            try {
                const Updatedappointment = await Appointment.findByIdAndUpdate(
                    _id,
                    {
                        EndTime,
                        Status: {
                            Tag: AppointmentStatus[4],
                            Details: null
                        },
                        Price: CalculateTotalPrice
                    },
                    { new: true }
                )
                return Updatedappointment
            } catch (error) {
                throw error
            }


        },
        updateAppointmentReview: async (_, args) => {
            const { _id } = args;
            const { Star } = args.reviewinput

            try {

                const AppointmentDetail = await Appointment.findById(_id)
                const GuideDetail = await Guide.findById(AppointmentDetail.Guide)

                //Calculate AvgScore
                const NewReviewStat =  (newReview, oldReview) => {
                    if (oldReview === 0) {
                        return newReview
                    } else {
                        return Math.round((newReview + oldReview) / 2)
                    }
                }

                const stat = NewReviewStat(Star, GuideDetail.Rating)

                await Guide.findByIdAndUpdate(
                    AppointmentDetail.Guide,
                    {

                        Rating: stat,
                        Tips: ReviewStatRating[stat]

                    },
                    { new: true })


                return await Appointment.findByIdAndUpdate(
                    _id,
                    {
                        Review: args.reviewinput,
                    },
                    { new: true }
                )

            } catch (error) {
                throw error
            }


        },
        updateAppointmentRecord: async (_, args) => {
            const { _id, recordinput } = args;

            try {
                const Updatedappointment = await Appointment.findByIdAndUpdate(
                    _id,
                    { "$push": { "Record": recordinput } },
                    { new: true }
                )
                return Updatedappointment
            } catch (error) {
                throw error
            }


        },
        deleteAppointment: async (_, { _id }) => {
            try {
                const deletedAppointment = await Appointment.findByIdAndDelete(_id);

                //Delete OLD Request
                await GuideSchedule.findOneAndUpdate(
                    { WorkOnMorningAppointment: _id },
                    {
                        AvailableMorning: true,
                        WorkOnMorningAppointment: null,
                        ScheduleMorningStatus: {
                            Tag: GuideScheduleStatus[0]
                        }
                    }, { new: true })
                await GuideSchedule.findOneAndUpdate(
                    { WorkOnAfternoonAppointment: _id },
                    {
                        AvailableAfternoon: true,
                        WorkOnAfternoonAppointment: null,
                        ScheduleAfternoonStatus: {
                            Tag: GuideScheduleStatus[0]
                        }
                    }, { new: true })

                if (deletedAppointment) return `This appointment<ID:${deletedAppointment.id}> just been deleted`;
                throw new Error('Some thing went wrong')
            } catch (error) {
                throw error
            }

        },
        postnewRecordTitles: async (_, { newTitle }) => {
            try {
                return await new RecordTitle({
                    Title: newTitle
                }).save()
            } catch (error) {
                throw error
            }

        },
    }
}