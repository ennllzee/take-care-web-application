const { gql } = require('apollo-server-express');

exports.Guide = gql`
    type Guide implements User{
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
        IsVerified: Boolean!
        Education: Education!
        WorkExp: [WorkExp]
        LangSkill: [LangSkill]
        IdCard: String
        FaceWithIdCard: Img
        VerifyDate: String        
        GoogleId: String!
        Avatar: Img
        Role: String!
        Status: Status
        Rating: Int
        Tips: Int
        CreatedAt: String!
        UpdatedAt: String!
    }   
`;