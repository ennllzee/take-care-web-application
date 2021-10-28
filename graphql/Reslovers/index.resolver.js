require('dotenv').config();
const { merge } = require('lodash')

const { AppointmentResolver } = require('./appointment.resolver');
const { HospitalResolver } = require('./hospital.resolver');
const { BuildingResolver } = require('./building.resolver');
const { DepartmentResolver } = require('./department.resolver');
const { RecordResolver } = require('./record.resolver');
const { AdminResolver } = require('./admin.resolver');
const { GuideResolver } = require('./guide.resolver');
const { CustomerResolver } = require('./customer.resolver');
const { GuideScheduleResolver } = require('./guideschedule.resolver');
const { ReportResolver } = require('./report.resolver');
const { UploadResolver } = require('./upload.resolver');
const { ImgResolver } = require('./img.resolver');
const { EducationResolver } = require('./education.resolver');
const { UserResolver } = require('./user.resolver');


const { MutationResolver } = require('./mutation/index');
const { QueryResolver } = require('./query/index');


const resolvers = merge(
  QueryResolver,
  MutationResolver,
  AppointmentResolver,
  HospitalResolver,
  BuildingResolver,
  DepartmentResolver,
  AdminResolver,
  GuideResolver,
  CustomerResolver,
  GuideScheduleResolver,
  RecordResolver,
  ReportResolver,
  UploadResolver,
  ImgResolver,
  EducationResolver,
  UserResolver,
)

module.exports = resolvers;
