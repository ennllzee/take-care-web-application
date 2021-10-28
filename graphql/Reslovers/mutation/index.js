require('dotenv').config();
const { merge } = require('lodash')

const { AdminMutation } = require('./admin.mutation')
const { AppointmentMutation } = require('./appointment.mutation')
const { BuildingMutation } = require('./building.mutation')
const { DepartmentMutation } = require('./department.mutation')
const { GuideMutation } = require('./guide.mutation')
const { GuideScheduleMutation } = require('./guideschedule.mutation')
const { HospitalMutation } = require('./hospital.mutation')
const { CustomerMutation } = require('./customer.mutation')
const { ReportMutation } = require('./report.mutation')
const { UploadfileMutation } = require('./uploadfile.mutation')


exports.MutationResolver = merge(
    CustomerMutation,
    GuideMutation,
    AdminMutation,
    DepartmentMutation,
    BuildingMutation,
    HospitalMutation,
    AppointmentMutation,
    GuideScheduleMutation,
    ReportMutation,
    UploadfileMutation,
)