const { gql } = require('apollo-server-express');

exports.GuideSchedule = gql`
    type GuideSchedule {
        _id: ID!
        ScheduleDate: String!
        AvailableMorning: Boolean!
        AvailableAfternoon: Boolean!
        Period: String!
        WorkOnMorningAppointment: Appointment
        WorkOnAfternoonAppointment: Appointment
        Createdby: Guide
        ScheduleMorningStatus: Status
        ScheduleAfternoonStatus: Status
        CreatedAt: String!
        UpdatedAt: String!
    }
`;