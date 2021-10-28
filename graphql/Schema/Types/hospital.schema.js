const { gql } = require('apollo-server-express');

exports.Hospital = gql`
    type Hospital {
        _id: ID!
        Name: String!
        Address: String!
        Building: [Building!]
        Department: [Department!]
        CreatedAt: String!
        UpdatedAt: String!
    }
`;