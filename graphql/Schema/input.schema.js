const { gql } = require('apollo-server-express');

exports.InputTypes = gql`
    input EducationInput {
        Degree: String
        Acadamy: String
        Certificate: String
    }

    input WorkExpInput {
        JobTitle: String!
        WorkPlace: String!
    }

    input LangSkillInput {
        Language: String!
        Level: Int!
    }

    input CustomerSigninInput {
        FirstName: String!
        LastName: String!
        Gender: String!
        DOB: String!      
        PhoneNumber: String!
        Email: String
        EmergencyTel: String
        Avatar: String
        CongenitalDisorders: String
        Token: String!
    }

    input GuideSigninInput {
        FirstName: String!
        LastName: String!
        Gender: String!
        DOB: String!
        Address: String!
        ContactAddress: String!
        PhoneNumber: String!
        Email: String
        Education: EducationInput
        WorkExp: [WorkExpInput!]
        LangSkill: [LangSkillInput!]
        IdCard: String
        FaceWithIdCard: String
        Avatar: String
        Token: String!    
    }

    input AdminSigninInput {
        FirstName: String!
        LastName: String!
        Gender: String!
        DOB: String!
        Address: String!
        ContactAddress: String!
        PhoneNumber: String!
        Email: String
        Education: EducationInput
        WorkExp: [WorkExpInput!]
        LangSkill: [LangSkillInput!]
        IdCard: String!
        Token: String!
    }

    input ReviewInput {
        Star: Int!
        Comment: String!
    }

    input RecordInput {
        At: String
        Title: String!
        Description: String
    }

    input BookingAppointmentInput {
        AppointTime: String!         
        CustomerId: ID!      
        DepId: ID!
        HospitalId: ID!
        Note: String
        Period: String
        ScheuleGuideId: ID!
    }

    input UpdateAppointmentInput {
        AppointTime: String      
        DepId: ID!
        HospitalId: ID!
        Note: String
        Period: String
        ScheuleGuideId: ID!
    }

    input DepartmentInput {
        Name: String!
        Building: String!
    }

    input BuildingInput {
        Name: String!
        Hospital: String!
    }

    input HospitalInput {
        Name: String!
        Address: String!
    }

    input CustomerUpdateInput {
        FirstName: String!
        LastName: String!
        Gender: String!
        DOB: String!      
        PhoneNumber: String!
        EmergencyTel: String
        CongenitalDisorders: String
    }

    input GuideUpdateInput {
        FirstName: String!
        LastName: String!
        Gender: String!
        DOB: String!
        Address: String!
        ContactAddress: String!
        PhoneNumber: String!
        Education: EducationInput
        WorkExp: [WorkExpInput]
        LangSkill: [LangSkillInput]
        IdCard: String
    }

    input AdminUpdateInput {
        FirstName: String!
        LastName: String!
        Gender: String!
        DOB: String!
        Address: String!
        ContactAddress: String!
        PhoneNumber: String!
        Education: EducationInput!
        WorkExp: [WorkExpInput!]
        LangSkill: [LangSkillInput!]
        IdCard: String!
        FaceWithIdCard: String!
        Avatar: String!
    }

    input GuideScheduleInput {
        ScheduleDate: String!
        Period: String!
        Createdby: ID!
    }

    input ReportInput {
        Title: String!
        Description: String
        Reporter: ID!
    }

    input Filter {
        star: IntFilter
        Language: StringFilter

        and: [Filter!]
        or: [Filter!]
        not: [Filter!]
    }

    input IntFilter {
        equals: Int
        gt: Int
        gte: Int
        lt: Int
        lte: Int        
    }

    input StringFilter {
        equals: String
        contains: String
    }
`