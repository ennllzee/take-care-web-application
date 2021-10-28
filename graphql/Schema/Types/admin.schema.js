const { gql } = require('apollo-server-express');

exports.Admin = gql`
    type Admin implements User {
        _id: ID!
        FirstName: String!
        LastName: String!
        Gender: String!
        DOB: String!
        Address: String!
        ContactAddress: String!
        PhoneNumber: String!
        Email: String!
        Gmail: String!
        Education: Education!
        WorkExp: [WorkExp!]
        LangSkill: [LangSkill!]
        IdCard: String!
        FaceWithIdCard: Img 
        GoogleId: String!
        Avatar: Img
        Role: String!
        CreatedAt: String!
        UpdatedAt: String!
    }    
`;