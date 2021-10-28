const { gql } = require('apollo-server-express');

const { Admin } = require('./Types/admin.schema');
const { Customer } = require('./Types/customer.schema');
const { Appointment } = require('./Types/appointment.schema');

const { Building } = require('./Types/building.schema');
const { Department } = require('./Types/department.schema');
const { Education } = require('./Types/education.schema');
const { Guide } = require('./Types/guide.schema');
const { GuideSchedule } = require('./Types/guideschedule.schema');
const { Hospital } = require('./Types/hospital.schema');
const { LangSkill } = require('./Types/langskill.schema');
const { Record } = require('./Types/record.schema');
const { Review } = require('./Types/review.schema');
const { WorkExp } = require('./Types/workexp.schema');
const { Status } = require('./Types/status.schema')
const { Report } = require('./Types/report.schema')
const { UploadedFile } = require('./Types/uploadedfile.schema')
const { Img } = require('./Types/img.schema');
const { RecordTitle } = require('./Types/recordkeyword.schema')
const { User } = require('./Types/user.schema')


const { InputTypes } = require('./input.schema');
const { QueryTypes } = require('./query.schema');
const { MutationTypes } = require('./mutation.schema');

const typeDefs = [
    InputTypes,
    QueryTypes,
    MutationTypes,
    Admin,
    Customer,
    Appointment,
    Building,
    Department,
    Education,
    Guide,
    GuideSchedule,
    Hospital,
    LangSkill,
    Record,
    Review,
    WorkExp,
    Status,
    Report,
    UploadedFile,
    Img,
    RecordTitle,
    User,
];

module.exports = typeDefs;