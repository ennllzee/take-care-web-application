const { gql } = require('apollo-server-express');

exports.Education = gql`
    type Education {
        Degree: String
        Acadamy: String
        Certificate: Img
    }
`;