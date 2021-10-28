const Guide = require('../../models/guide.model')
const Appointment = require('../../models/appointment.model')

const { dateresolver } = require("../../helpers/index")


exports.GuideScheduleResolver = {
    GuideSchedule: {
        ScheduleDate: ({ ScheduleDate }) => {
            return dateresolver(ScheduleDate)
        },
        WorkOnMorningAppointment: async ({ WorkOnMorningAppointment }) => {
            try {
                return await Appointment.findById(WorkOnMorningAppointment)
            } catch (error) {
                throw error
            }
        },
        WorkOnAfternoonAppointment: async ({ WorkOnAfternoonAppointment }) => {
            try {
                return await Appointment.findById(WorkOnAfternoonAppointment)
            } catch (error) {
                throw error
            }
        },
        Createdby: async ({ Createdby }) => {
            try {
                return await Guide.findById(Createdby)
            } catch (error) {
                throw error
            }
        },
        CreatedAt: ({ CreatedAt }) => {
            return dateresolver(CreatedAt)
        },
        UpdatedAt: ({ UpdatedAt }) => {
            return dateresolver(UpdatedAt)
        },
    },
}