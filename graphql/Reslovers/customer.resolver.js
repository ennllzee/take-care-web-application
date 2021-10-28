const { dateresolver } = require("../../helpers/index")
const CustomerProfileImg = require('../../models/customerprofileimg.model')

exports.CustomerResolver = {
    Customer: {
        DOB: ({ DOB }) => {
            return dateresolver(DOB)
        },
        Avatar: async ({ Avatar }) => {
            if (!Avatar) return null
            return await CustomerProfileImg.findById(Avatar)
        },
        CreatedAt: ({ CreatedAt }) => {
            return dateresolver(CreatedAt)
        },
        UpdatedAt: ({ UpdatedAt }) => {
            return dateresolver(UpdatedAt)
        },
    },
}