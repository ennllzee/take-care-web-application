const { gql } = require('apollo-server-express');

exports.User = gql`
    interface User {
        _id: ID!
        FirstName: String!
        LastName: String!
        Gender: String!
        DOB: String!
        PhoneNumber: String!
        Email: String!
        Gmail: String!
        GoogleId: String!
        Avatar: Img
        Role: String!
        CreatedAt: String!
        UpdatedAt: String!
    }

    # union Userquery = Customer | Admin | Guide
`;