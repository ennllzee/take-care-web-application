const { gql } = require('apollo-server-express');

exports.Appointment = gql`
    type Appointment {
        _id: ID!
        AppointTime: String
        BeginTime: String
        EndTime: String
        Customer: Customer!
        Guide: Guide
        Department: Department!
        Hospital: Hospital!
        Review: Review
        Record: [Record!]
        OpenLink: String
        Note: String
        Status: Status
        Period: String
        Price: Int!
        CreatedAt: String!
        UpdatedAt: String!
    }
`;