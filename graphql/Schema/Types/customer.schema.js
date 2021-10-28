const { gql } = require('apollo-server-express');

exports.Customer = gql`
    type Customer implements User {
        _id: ID!
        FirstName: String!
        LastName: String!
        Gender: String!
        DOB: String!
        PhoneNumber: String!
        Email: String!
        Gmail: String!
        EmergencyTel: String
        GoogleId: String!
        Avatar: Img
        CongenitalDisorders: String
        Role: String!
        CreatedAt: String!
        UpdatedAt: String!
    }
`;