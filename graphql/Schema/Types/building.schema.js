const { gql } = require('apollo-server-express');

exports.Building = gql`
    type Building {
        _id: ID!
        Name: String!
        Hospital: Hospital!
        Department: [Department!]
        CreatedAt: String!
        UpdatedAt: String!
    }
`;