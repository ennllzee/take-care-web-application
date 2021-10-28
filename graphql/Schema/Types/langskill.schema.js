const { gql } = require('apollo-server-express');

exports.LangSkill = gql`
    type LangSkill {
        Language: String
        Level: Int
    }
`;