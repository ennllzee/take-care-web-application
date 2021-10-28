const { gql } = require('apollo-server-express');

exports.MutationTypes = gql`
    type Mutation {
    #CreateUser 
    createdCustomer(input: CustomerSigninInput!): Customer
    createdGuide(input: GuideSigninInput!): Guide
    createdAdmin(input: AdminSigninInput!): Admin
    updateCustomer(_id: ID! ,input: CustomerUpdateInput!): Customer
    updateGuide(_id: ID! ,input: GuideUpdateInput!): Guide
    updateAdmin(_id: ID! ,input: AdminUpdateInput!): Admin
    deleteCustomer(_id: ID! ): Customer
    deleteGuide(_id: ID! ): Guide
    deleteAdmin(_id: ID! ): Admin

    # Verify Guide By Admin
    validateguide(_id: ID!, approve: Boolean!, text: String): Guide

    #CreateAppointment 
    createAppointment(input: BookingAppointmentInput): Appointment
    deleteAppointment(_id: ID!): String
    updateAppointmentRequestGuide(_id: ID! , ScheduleId: ID!, Period: String!): Appointment
    updateAppointmentBeginTime(_id: ID! , BeginTime: String!): Appointment
    updateAppointmentEndTime(_id: ID! , EndTime: String!): Appointment

    updateAppointmentReview(_id: ID! , reviewinput: ReviewInput): Appointment
    updateAppointmentRecord(_id: ID! , recordinput: RecordInput): Appointment

    #CreateDepartment
    createDepartment(input: DepartmentInput): Department
    deleteDepartment(_id: ID!): Department
    updateDepartment(_id: ID! , updateinput: DepartmentInput): Department

    #CreateBuilding
    createBuilding(input: BuildingInput): Building
    deleteBuilding(_id: ID!): Building
    updateBuilding(_id: ID! , updateinput: BuildingInput): Building

    #CreateHospital
    createHospital(input: HospitalInput): Hospital
    deleteHospital(_id: ID!): Hospital
    updateHospital(_id: ID! , updateinput: HospitalInput): Hospital

    #GuideWorkSchedule
    createGuideSchedule(input: GuideScheduleInput): GuideSchedule
    updateGuideSchedule(_id: ID!, Period: String!, Available: Boolean!): GuideSchedule

    updateGuideScheduleResponseAppointment(response: Boolean!, WorkOnAppointmentId: ID!, cancleDetails: String): GuideSchedule
    deleteGuideSchedule(_id: ID!): GuideSchedule

    createReport(input: ReportInput!): Report
    responseBack(_id: ID!, ResponseText: String!, ResponseByAdmin: ID!): Report

    
    addCustomerProfile(customerId: ID!, file: Upload): Boolean!
    addGuideProfile(guideId: ID!, file: Upload): Boolean!
    uploadCertificateGuide(guideId: ID!, file: Upload): Boolean!
    uploadFaceWithIdcardGuide(guideId: ID!, file: Upload): Boolean!
    
    uploadfilesAdmin(adminId: ID!, file: [Upload]): Boolean!

    postnewRecordTitles(newTitle: String): RecordTitle

    }
`;