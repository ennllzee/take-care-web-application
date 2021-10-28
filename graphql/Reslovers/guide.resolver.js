const { dateresolver } = require("../../helpers/index")
const GuideProfileImg = require('../../models/guideprofileimg.model')
const GuideFile = require('../../models/guidefileupload.model')

exports.GuideResolver = {
    Guide: {
        DOB: ({ DOB }) => {
            return dateresolver(DOB)
        },
        FaceWithIdCard: async ({ FaceWithIdCard }) => {
            if (!FaceWithIdCard) return null
            return await GuideFile.findById(FaceWithIdCard)
        },
        Avatar: async ({ Avatar }) => {
            if (!Avatar) return null
            return await GuideProfileImg.findById(Avatar)
        },
        VerifyDate: ({ VerifyDate }) => {
            return dateresolver(VerifyDate)
        },
        CreatedAt: ({ CreatedAt }) => {
            return dateresolver(CreatedAt)
        },
        UpdatedAt: ({ UpdatedAt }) => {
            return dateresolver(UpdatedAt)
        },
    },
}