const { gql } = require('apollo-server-express');

exports.Report = gql`
    type Report {
        _id: ID!
        Title: String!
        Description: String
        Reporter: reporter_type
        ResponseText: String
        ResponseByAdmin: Admin
        CreatedAt: String!
        UpdatedAt: String!
    }
    union reporter_type = Customer | Guide 
`;