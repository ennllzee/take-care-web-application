const { dateresolver } = require("../../helpers/index")
const AdminFile = require('../../models/adminfileupload.model')


exports.AdminResolver = {
    Admin: {
        DOB: ({ DOB }) => {
            return dateresolver(DOB)
        },
        FaceWithIdCard: async ({ FaceWithIdCard }) => {
            if (!FaceWithIdCard) return null
            return await AdminFile.findById(FaceWithIdCard)
        },
        Avatar: async ({ Avatar }) => {
            if (!Avatar) return null
            return await AdminFile.findById(Avatar)
        },
        CreatedAt: ({ CreatedAt }) => {
            return dateresolver(CreatedAt)
        },
        UpdatedAt: ({ UpdatedAt }) => {
            return dateresolver(UpdatedAt)
        },
    }
}