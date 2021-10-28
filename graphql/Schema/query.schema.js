const { gql } = require('apollo-server-express');

exports.QueryTypes = gql`  
    type Query {
        getAllCustomer: [Customer]
        getCustomer(_id: ID!): Customer

        getAllGuide: [Guide]
        getGuide(_id: ID!): Guide

        getAllAdmin: [Admin]
        getAdmin(_id: ID!): Admin
        
        getAllAppointment(Customerd: ID, GuideId: ID, DateAt: ID): [Appointment]
        getAllAppointmentByCustomer(CustomerId: ID!): [Appointment]
        getAllAppointmentByGuide(GuideId: ID!): [Appointment]
        getAppointment(_id: ID): Appointment

        getAllDepartment: [Department]
        getDepartment(_id: ID!): Department

        getAllBuilding: [Building]
        getBuilding(_id: ID!): Building

        getAllHospital: [Hospital]
        getHospital(_id: ID!): Hospital

        loginCustomer(Token: String): Customer
        loginGuide(Token: String): Guide 
        loginAdmin(Token: String): Admin

        getAvailableGuide(CustomerId: ID, Date: String!, Period: String!): [GuideSchedule]
        
        getAllGuideschedule: [GuideSchedule]
        getAllGuidescheduleByGuide(GuideId: ID!): [GuideSchedule]
        getGuideschedule(_id: ID!): GuideSchedule

        getRequestedGuideschedule(GuideId: ID!): [GuideSchedule]

        getAppointmentStatus: [String]
        getGuideStatus: [String]
        getPeriod: [String]

        getNonVerifyGuide: [Guide!]

        getAllReport: [Report]!
        getRequestReport: [Report]!

        getAllRecordTitles: [RecordTitle]

        getAllUser: [User]
    }
`