const Customer = require('../../models/customer.model')
const Guide = require('../../models/guide.model')
const Admin = require('../../models/admin.model')

const { dateresolver } = require("../../helpers/index")

exports.ReportResolver = {
    Report: {
        Reporter: async ({ Reporter }) => {
            try {

                const existCustomer = await Customer.findById(Reporter)
                const existGuide = await Guide.findById(Reporter)
                
                if (existCustomer) return existCustomer
                if (existGuide) return existGuide

                return null

            } catch (error) {
                throw error
            }
        },
        ResponseByAdmin: async ({ ResponseByAdmin }) => {
            try {
                return await Admin.findById(ResponseByAdmin)
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
    reporter_type: {
        async __resolveType(userId, context, info) {

            const existCustomer = await Customer.findById(userId)
            const existGuide = await Guide.findById(userId)

            if (existCustomer) return 'Customer'
            if (existGuide) return 'Guide'

            return null;
        },
    }
}