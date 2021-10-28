require('dotenv').config();
const bcrypt = require('bcryptjs');
const verify = require('../../../helpers/googleOauthForGuide')

const Guide = require('../../../models/guide.model')

exports.GuideQuery = {
    Query: {
        getAllGuide: async () => {
            try {
                return await Guide.find()
            } catch (error) {
                console.log(error)
            }
        },
        getGuide: async (parent, args, context, info) => {
            const { _id } = args
            try {
                return await Guide.findById(_id)
            } catch (error) {
                console.log(error)
            }

        },
        loginGuide: async (parent, args, context, info) => {
            const { Token } = args

            const { userid, Gmail } = await verify(Token).catch((error) => { throw error });

            try {

                const user = await Guide.findOne({ Gmail });
                if (user) {
                    const isEqual = await bcrypt.compare(userid, user._doc.GoogleId);
                    if (!isEqual) throw new Error('Login Failed');
                } else {
                    throw new Error('Not Found Guide');
                }

                return user;

            } catch (error) {
                throw error
            }

        }
    }
}