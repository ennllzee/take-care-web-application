const { gql } = require('apollo-server-express');

exports.Department = gql`
    type Department {
        _id: ID!
        Name: String!
        Building: Building!
        Hospital: Hospital!
        CreatedAt: String!
        UpdatedAt: String!
    }
`;