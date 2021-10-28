const Customer = require('../../models/customer.model')
const Guide = require('../../models/guide.model')
const Department = require('../../models/department.model')
const Hospital = require('../../models/hospital.model')

const { dateresolver } = require("../../helpers/index")


exports.AppointmentResolver = {
    Appointment: {
        Customer: async (parent) => {
            try {
                return await Customer.findById(parent.Customer)
            } catch (error) {
                throw error
            }
        },
        Guide: async (parent) => {
            if (parent.Guide === null) return null;
            try {
                return await Guide.findById(parent.Guide)
            } catch (error) {
                throw error
            }
        },
        Department: async (parent) => {
            try {
                return await Department.findById(parent.Department)
            } catch (error) {
                throw error
            }
        },
        Hospital: async (parent) => {
            try {
                return await Hospital.findById(parent.Hospital)
            } catch (error) {
                throw error
            }
        },
        AppointTime: ({ AppointTime }) => {
            return dateresolver(AppointTime)
        },
        BeginTime: ({ BeginTime }) => {
            return dateresolver(BeginTime)
        },
        EndTime: ({ EndTime }) => {
            return dateresolver(EndTime)
        },
        UpdatedAt: ({ UpdatedAt }) => {
            return dateresolver(UpdatedAt)
        },
        CreatedAt: ({ CreatedAt }) => {
            return dateresolver(CreatedAt)
        },
    }
}