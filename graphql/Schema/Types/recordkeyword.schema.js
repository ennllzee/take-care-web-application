const { gql } = require('apollo-server-express');

exports.RecordTitle = gql`
    type RecordTitle {
        Title: String
    }
`;