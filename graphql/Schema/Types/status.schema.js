const { gql } = require('apollo-server-express');

exports.Status = gql`
    type Status {
        Tag: String
        Details: [String]
    }
`;