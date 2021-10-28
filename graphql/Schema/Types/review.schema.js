const { gql } = require('apollo-server-express');

exports.Review = gql`
    type Review {
        Star: Int
        Comment: String
    }
`;