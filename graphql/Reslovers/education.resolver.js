
const GuideFile = require('../../models/guidefileupload.model')

exports.EducationResolver = {
    Education: {
        Certificate: async ({ Certificate }) => {
            return await GuideFile.findById(Certificate)
        }
    }
}