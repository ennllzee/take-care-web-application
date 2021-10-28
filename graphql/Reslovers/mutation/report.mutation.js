require('dotenv').config();

const Report = require('../../../models/report.model')
const Guide = require('../../../models/guide.model')
const Customer = require('../../../models/customer.model')
const Admin = require('../../../models/admin.model')

exports.ReportMutation = {
    Mutation: {
        createReport: async (_, args) => {
            const { Title, Description, Reporter } = args.input

            const existCustomer = await Customer.findById(Reporter)
            const guide = await Guide.findById(Reporter)

            if (!guide && !existCustomer) throw new Error('Not Found User')


            try {

                const newReport = new Report({
                    Title,
                    Description,
                    Reporter,
                })

                await newReport.save()
                return newReport

            } catch (error) {
                throw error;
            }
        },
        responseBack: async (_, { _id, ResponseText, ResponseByAdmin }) => {

            const admin = await Admin.findById(ResponseByAdmin)
            if (!admin) throw new Error('Not Found Admin User')

            try {
                const res_report = await Report.findByIdAndUpdate(
                    _id,
                    {
                        ResponseText,
                        ResponseByAdmin
                    },
                    { new: true }
                )

                return res_report
            } catch (error) {
                throw error
            }

        },
    }
}