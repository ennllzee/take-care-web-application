require('dotenv').config();
const moment = require('moment')

const Guide = require('../../../models/guide.model')
const Appointment = require('../../../models/appointment.model')
const GuideSchedule = require("../../../models/guideworkschedule.model")

const { AppointmentStatus, GuideScheduleStatus, PeriodStatus } = require('../../../Db/db.json')

exports.GuideScheduleMutation = {
    Mutation: {
        createGuideSchedule: async (_, args) => {
            const {
                ScheduleDate,
                Period,
                Createdby,
            } = args.input

            try {

                const existGuide = await Guide.findById(Createdby)
                if (!existGuide) throw new Error('GuideUser Not Found');
                if (!existGuide.IsVerified) throw new Error('Guide Not Verified');
                console.log(ScheduleDate) 

                //Check if the schedule exists
                const existguidescheduleV1 = await GuideSchedule.findOne({ 
                    Createdby, 
                    ScheduleDate:{
                            $gte: moment(ScheduleDate).startOf('day').format(),
                            $lt: moment(ScheduleDate).endOf('day').format()
                        }, 
                })
                if (existguidescheduleV1) throw new Error('This guideschedule is exist')

                if (!moment().isBefore(ScheduleDate)) throw new Error('ScheduleDate must for future only');

                if (Period === PeriodStatus[2]) {
                    const existcheck1 = await GuideSchedule.findOne({ ScheduleDate, Createdby, Period: PeriodStatus[0] })
                    const existcheck2 = await GuideSchedule.findOne({ ScheduleDate, Createdby, Period: PeriodStatus[1] })

                    if (existcheck1) {
                        return await GuideSchedule.findByIdAndUpdate(
                            existcheck1._id,
                            {
                                Period: PeriodStatus[2],
                                AvailableAfternoon: true,
                                ScheduleAfternoonStatus: {
                                    Tag: GuideScheduleStatus[0],
                                    Details: null
                                },
                            },
                            { new: true }
                        )
                    } else if (existcheck2) {
                        return await GuideSchedule.findByIdAndUpdate(
                            existcheck2._id,
                            {
                                Period: PeriodStatus[2],
                                AvailableMorning: true,
                                ScheduleMorningStatus: {
                                    Tag: GuideScheduleStatus[0],
                                    Details: null
                                },
                            },
                            { new: true }
                        )
                    } else {
                        return await new GuideSchedule({
                            ScheduleDate,
                            Period,
                            Createdby,
                            ScheduleMorningStatus: {
                                Tag: GuideScheduleStatus[0],
                                Details: null
                            },
                            ScheduleAfternoonStatus: {
                                Tag: GuideScheduleStatus[0],
                                Details: null
                            },
                        }).save()
                    }

                } else {
                    const existScheduleAll_day = await GuideSchedule.findOne({ Createdby, ScheduleDate, Period: "All-day" })
                    if (existScheduleAll_day) throw new Error('Cannot Create Schedule that already exists')

                    if (Period === PeriodStatus[0]) {
                        const exist = await GuideSchedule.findOne({ ScheduleDate, Createdby, Period: PeriodStatus[1] })
                        if (exist) {
                            return await GuideSchedule.findByIdAndUpdate(
                                exist._id,
                                {
                                    Period: PeriodStatus[2],
                                    AvailableMorning: true,
                                    ScheduleMorningStatus: {
                                        Tag: GuideScheduleStatus[0],
                                        Details: null
                                    },
                                },
                                { new: true }
                            )
                        } else {
                            return await new GuideSchedule({
                                ScheduleDate,
                                AvailableAfternoon: false,
                                Period,
                                Createdby,
                                ScheduleMorningStatus: {
                                    Tag: GuideScheduleStatus[0],
                                    Details: null
                                },
                            }).save()
                        }

                    } else if (Period === PeriodStatus[1]) {
                        const exist = await GuideSchedule.findOne({ ScheduleDate, Createdby, Period: PeriodStatus[0] })
                        if (exist) {
                            return await GuideSchedule.findByIdAndUpdate(
                                exist._id,
                                {
                                    Period: PeriodStatus[2],
                                    AvailableAfternoon: true,
                                    ScheduleAfternoonStatus: {
                                        Tag: GuideScheduleStatus[0],
                                        Details: null
                                    },
                                },
                                { new: true }
                            )
                        } else {
                            return await new GuideSchedule({
                                ScheduleDate,
                                AvailableMorning: false,
                                Period,
                                Createdby,
                                ScheduleAfternoonStatus: {
                                    Tag: GuideScheduleStatus[0],
                                    Details: null
                                },
                            }).save()
                        }

                    }
                }

            } catch (error) {
                throw error
            }
        },
        updateGuideSchedule: async (_, args) => {
            const {
                _id,
                Period,
                Available
            } = args

            try {

                const previousschedule = await GuideSchedule.findById(_id)
                if (!previousschedule) throw new Error('Appointment Not Found')

                if (Period == PeriodStatus[0]) {
                    const DeleteAble = await GuideSchedule.findById(_id)
                    if (DeleteAble._doc.ScheduleMorningStatus.Tag === GuideScheduleStatus[2]) throw new Error('Cant UPDATE Schedule that confirm Appointment')

                    if (Available) {
                        return await GuideSchedule.findByIdAndUpdate(
                            _id,
                            {
                                AvailableMorning: Available,
                                Period: PeriodStatus[0]
                            },
                            { new: true }
                        )
                    } else {
                        const schedule = await GuideSchedule.findByIdAndUpdate(
                            _id,
                            {
                                WorkOnMorningAppointment: null,
                                AvailableMorning: Available,
                                ScheduleMorningStatus: {
                                    Tag: null
                                }
                            },
                            { new: true }
                        )

                        await Appointment.findByIdAndUpdate(
                            previousschedule.WorkOnMorningAppointment,
                            {
                                Guide: null,
                                Status: {
                                    Tag: AppointmentStatus[2]
                                }
                            },
                            { new: true }
                        )

                        return schedule
                    }

                } else if (Period == PeriodStatus[1]) {
                    const DeleteAble = await GuideSchedule.findById(_id)
                    if (DeleteAble._doc.ScheduleAfternoonStatus.Tag === GuideScheduleStatus[2]) throw new Error('Cant UPDATE Schedule that confirm Appointment')

                    if (Available) {
                        return await GuideSchedule.findByIdAndUpdate(
                            _id,
                            {
                                AvailableAfternoon: Available,
                                Period: PeriodStatus[1]
                            },
                            { new: true }
                        )
                    } else {
                        const schedule = await GuideSchedule.findByIdAndUpdate(
                            _id,
                            {
                                WorkOnAfternoonAppointment: null,
                                AvailableAfternoon: Available,
                                ScheduleAfternoonStatus: {
                                    Tag: null
                                }
                            },
                            { new: true }
                        )

                        await Appointment.findByIdAndUpdate(
                            previousschedule.WorkOnAfternoonAppointment,
                            {
                                Guide: null,
                                Status: {
                                    Tag: AppointmentStatus[2]
                                }
                            },
                            { new: true }
                        )

                        return schedule
                    }

                } else if (Period == PeriodStatus[2]) {
                    const DeleteAble = await GuideSchedule.findById(_id)
                    if (DeleteAble._doc.ScheduleMorningStatus.Tag === GuideScheduleStatus[2] || DeleteAble._doc.ScheduleAfternoonStatus.Tag === GuideScheduleStatus[2]) throw new Error('Cant UPDATE Schedule that confirm Appointment')

                    if (Available) {
                        return await GuideSchedule.findByIdAndUpdate(
                            _id,
                            {
                                AvailableAfternoon: Available,
                                AvailableMorning: Available,
                                Period: PeriodStatus[2]
                            },
                            { new: true }
                        )
                    } else {
                        const schedule = await GuideSchedule.findByIdAndUpdate(
                            _id,
                            {
                                WorkOnMorningAppointment: null,
                                AvailableMorning: Available,
                                ScheduleMorningStatus: {
                                    Tag: null
                                },
                                WorkOnAfternoonAppointment: null,
                                AvailableAfternoon: Available,
                                ScheduleAfternoonStatus: {
                                    Tag: null
                                }
                            },
                            { new: true }
                        )

                        await Appointment.findByIdAndUpdate(
                            previousschedule.WorkOnMorningAppointment,
                            {
                                Guide: null,
                                Status: {
                                    Tag: AppointmentStatus[2]
                                }
                            },
                            { new: true }
                        )
                        await Appointment.findByIdAndUpdate(
                            previousschedule.WorkOnAfternoonAppointment,
                            {
                                Guide: null,
                                Status: {
                                    Tag: AppointmentStatus[2]
                                }
                            },
                            { new: true }
                        )

                        return schedule
                    }

                }


            } catch (error) {
                throw error
            }
        },
        updateGuideScheduleResponseAppointment: async (_, args) => {
            const {
                response,
                WorkOnAppointmentId,
                cancleDetails
            } = args

            //Check exist appointment
            const existAppointment = await Appointment.findById(WorkOnAppointmentId)
            if (!existAppointment) throw new Error('Appointment Not Found');

            if (response) {
                try {
                    await Appointment.findByIdAndUpdate(WorkOnAppointmentId, {
                        Status: {
                            Tag: AppointmentStatus[1]
                        },
                    }, { new: true })
                    const Period = existAppointment.Period;

                    if (Period === PeriodStatus[0]) {
                        return await GuideSchedule.findOneAndUpdate(
                            {
                                $or: [
                                    { WorkOnMorningAppointment: WorkOnAppointmentId },
                                    { WorkOnAfternoonAppointment: WorkOnAppointmentId }
                                ]
                            },
                            {
                                AvailableMorning: false,
                                ScheduleMorningStatus: {
                                    Tag: GuideScheduleStatus[2]
                                },
                            },
                            { new: true }
                        )
                    } else if (Period === PeriodStatus[1]) {
                        return await GuideSchedule.findOneAndUpdate(
                            {
                                $or: [
                                    { WorkOnMorningAppointment: WorkOnAppointmentId },
                                    { WorkOnAfternoonAppointment: WorkOnAppointmentId }
                                ]
                            },
                            {
                                AvailableAfternoon: false,
                                ScheduleAfternoonStatus: {
                                    Tag: GuideScheduleStatus[2]
                                },
                            },
                            { new: true }
                        )
                    } else if (Period === PeriodStatus[2]) {
                        return await GuideSchedule.findOneAndUpdate(
                            {
                                $or: [
                                    { WorkOnMorningAppointment: WorkOnAppointmentId },
                                    { WorkOnAfternoonAppointment: WorkOnAppointmentId }
                                ]
                            },
                            {
                                AvailableMorning: false,
                                ScheduleMorningStatus: {
                                    Tag: GuideScheduleStatus[2]
                                },
                                AvailableAfternoon: false,
                                ScheduleAfternoonStatus: {
                                    Tag: GuideScheduleStatus[2]
                                },
                            },
                            { new: true }
                        )
                    }



                } catch (error) {
                    throw error
                }
            } else {
                try {
                    await Appointment.findByIdAndUpdate(
                        WorkOnAppointmentId,
                        {
                            Guide: null,
                            Status: {
                                Tag: AppointmentStatus[2],
                                Details: [cancleDetails]
                            },
                        },
                        { new: true }
                    )

                    if (existAppointment.Period === PeriodStatus[0]) {
                        return await GuideSchedule.findOneAndUpdate(
                            {
                                $or: [
                                    { WorkOnMorningAppointment: WorkOnAppointmentId },
                                    { WorkOnAfternoonAppointment: WorkOnAppointmentId }
                                ]
                            },
                            {
                                WorkOnMorningAppointment: null,
                                AvailableMorning: true,
                                ScheduleMorningStatus: {
                                    Tag: GuideScheduleStatus[0]
                                },
                            },
                            { new: true }
                        )
                    } else if (existAppointment.Period === PeriodStatus[1]) {
                        return await GuideSchedule.findOneAndUpdate(
                            {
                                $or: [
                                    { WorkOnMorningAppointment: WorkOnAppointmentId },
                                    { WorkOnAfternoonAppointment: WorkOnAppointmentId }
                                ]
                            },
                            {
                                WorkOnAfternoonAppointment: null,
                                AvailableAfternoon: true,
                                ScheduleAfternoonStatus: {
                                    Tag: GuideScheduleStatus[0]
                                },
                            },
                            { new: true }
                        )
                    } else if (existAppointment.Period === PeriodStatus[2]) {
                        return await GuideSchedule.findOneAndUpdate(
                            {
                                $or: [
                                    { WorkOnMorningAppointment: WorkOnAppointmentId },
                                    { WorkOnAfternoonAppointment: WorkOnAppointmentId }
                                ]
                            },
                            {
                                WorkOnMorningAppointment: null,
                                AvailableMorning: true,
                                ScheduleMorningStatus: {
                                    Tag: GuideScheduleStatus[0]
                                },
                                WorkOnAfternoonAppointment: null,
                                AvailableAfternoon: true,
                                ScheduleAfternoonStatus: {
                                    Tag: GuideScheduleStatus[0]
                                },
                            },
                            { new: true }
                        )
                    }

                } catch (error) {
                    throw error
                }
            }



        },
        deleteGuideSchedule: async (_, args) => {
            const { _id } = args;

            try {
                const DeleteAble = await GuideSchedule.findById(_id)
                if (DeleteAble._doc.ScheduleMorningStatus.Tag === GuideScheduleStatus[2] || DeleteAble._doc.ScheduleAfternoonStatus.Tag === GuideScheduleStatus[2]) throw new Error('Cant DELETE Schedule that confirm Appointment')

                const deletedGuideSchedule = await GuideSchedule.findByIdAndDelete(_id);
                return deletedGuideSchedule;
            } catch (error) {
                throw error
            }
        },
    }
}