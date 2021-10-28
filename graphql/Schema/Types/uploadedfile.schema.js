const { gql } = require('apollo-server-express');

exports.UploadedFile = gql`

    scalar Upload

    type UploadedFileResponse  {
        filename: String!
        mimetype: String!
        encoding: String!
        creator: ID!
    }
`