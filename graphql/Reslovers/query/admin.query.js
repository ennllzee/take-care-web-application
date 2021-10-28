require('dotenv').config();
const bcrypt = require('bcryptjs');
const verify = require('../../../helpers/googleOauthForAdmin')

const Admin = require('../../../models/admin.model')
const Guide = require('../../../models/guide.model')
const { GuideStatus } = require('../../../Db/db.json')

exports.AdminQuery = {
    Query: {
        getAllAdmin: async () => {
            try {
                return await Admin.find();
            } catch (error) {
                throw error;
            }

        },
        getAdmin: async (parent, args, context, info) => {
            const { _id } = args
            try {
                return await Admin.findById(_id)
            } catch (error) {
                console.log(errror)
            }

        },
        loginAdmin: async (parent, args, context, info) => {
            const { Token } = args

            const { userid, Gmail } = await verify(Token).catch((error) => { throw error });

            try {

                const user = await Admin.findOne({ Gmail });
                if (user) {
                    const isEqual = await bcrypt.compare(userid, user._doc.GoogleId);
                    if (!isEqual) throw new Error('Login Failed');
                } else {
                    throw new Error('Not Found Admin');
                }

                return user;

            } catch (error) {
                throw error;
            }

        },
        getNonVerifyGuide: async () => {
            try {
                return await Guide.find({ IsVerified: false, Status: { Tag: GuideStatus[0], Details: [] } })
            } catch (error) {
                throw error;
            }
        }
    }
}