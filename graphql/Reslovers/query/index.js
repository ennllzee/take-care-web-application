require('dotenv').config();
const { merge } = require('lodash')

const { CustomerQuery } = require('./customer.query')
const { GuideQuery } = require('./guide.query')
const { AdminQuery } = require('./admin.query')
const { AppointmentQuery } = require('./appointment.query')
const { BuildingQuery } = require('./building.query')
const { DepartmentQuery } = require('./department.query')
const { GuideScheduleQuery } = require('./guideschedule.query')
const { HospitalQuery } = require('./hospital.query')
const { StatusQuery } = require('./status.query')
const { ExtensionstionQuery } = require('./extendtion.query')
const { ReportQuery } = require('./report.query')
const { UserQuery } = require('./user.query')


exports.QueryResolver = merge(
    CustomerQuery,
    GuideQuery,
    AdminQuery,
    AppointmentQuery,
    BuildingQuery,
    DepartmentQuery,
    GuideScheduleQuery,
    HospitalQuery,
    StatusQuery,
    ExtensionstionQuery,
    ReportQuery,
    UserQuery,
);