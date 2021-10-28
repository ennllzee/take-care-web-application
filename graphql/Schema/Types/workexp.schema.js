const { gql } = require('apollo-server-express');

exports.WorkExp = gql`
    type WorkExp {
        JobTitle: String!
        WorkPlace: String!
    }
`;