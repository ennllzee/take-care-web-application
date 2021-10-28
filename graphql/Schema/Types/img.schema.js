const { gql } = require('apollo-server-express');

exports.Img = gql`
    type Img {
        _id: ID!
        filename: String,
        mimetype: String,
        data: String,
    }
`;