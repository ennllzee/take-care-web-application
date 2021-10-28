const { dateresolver } = require("../../helpers/index")
const CustomerProfileImg = require('../../models/customerprofileimg.model')
const AdminFile = require('../../models/adminfileupload.model')
const GuideProfileImg = require('../../models/guideprofileimg.model')

exports.UserResolver = {
    User: {
        DOB: ({ DOB }) => {
            return dateresolver(DOB)
        },
        Avatar: async ({ Avatar, Role }) => {
            if (!Avatar) return null
            if (Role === 'admin') {
                return await AdminFile.findById(Avatar)
            } else if (Role === 'customer') {
                return await CustomerProfileImg.findById(Avatar)
            } else if (Role === 'guide') {
                return await GuideProfileImg.findById(Avatar)
            }
        },
        CreatedAt: ({ CreatedAt }) => {
            return dateresolver(CreatedAt)
        },
        UpdatedAt: ({ UpdatedAt }) => {
            return dateresolver(UpdatedAt)
        },
        __resolveType(userType, context, info) {
            if (userType.Role === 'customer') {
                return 'Customer';
            }
            if (userType.Role === 'guide') {
                return 'Guide';
            }
            if (userType.Role === 'admin') {
                return 'Admin';
            }
            return null; // GraphQLError is thrown
        },
    },
}