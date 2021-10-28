const { gql } = require('apollo-server-express');

exports.Record = gql`
    type Record {
        At: String
        Title: String
        Description: String
    }
`;