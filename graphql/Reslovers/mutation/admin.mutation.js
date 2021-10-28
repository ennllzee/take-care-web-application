require('dotenv').config();
const bcrypt = require('bcryptjs');
const verify = require('../../../helpers/googleOauthForAdmin')
const { GuideStatus } = require('../../../Db/db.json')

const Admin = require('../../../models/admin.model')
const Guide = require('../../../models/guide.model')


exports.AdminMutation = {
    Mutation: {
        createdAdmin: async (_, args) => {
            const {
                FirstName,
                LastName,
                Gender,
                DOB,
                Address,
                ContactAddress,
                PhoneNumber,
                Email,
                Education,
                WorkExp,
                LangSkill,
                IdCard,
                Token
            } = args.input;

            const { userid, Gmail } = await verify(Token).catch((error) => { throw error });

            const hashedGoogleId = await bcrypt.hash(userid, 12);

            try {

                if (Email === undefined || Email === null) {
                    Email = Gmail
                }

                const user = new Admin({
                    FirstName,
                    LastName,
                    Gender,
                    DOB,
                    Address,
                    ContactAddress,
                    PhoneNumber,
                    Email,
                    Education,
                    WorkExp,
                    LangSkill,
                    IdCard,
                    Gmail,
                    GoogleId: hashedGoogleId,
                    Role: "admin"
                });

                await user.save();
                return user

            } catch (err) {
                throw err;
            }
        },
        updateAdmin: async (_, args) => {
            const { _id } = args
            const {
                FirstName,
                LastName,
                Gender,
                DOB,
                Address,
                ContactAddress,
                PhoneNumber,
                Education,
                WorkExp,
                LangSkill,
                IdCard,
                FaceWithIdCard,
                Avatar,
            } = args.input;

            try {
                const UpdatedAdmin = await Admin.findByIdAndUpdate(
                    _id,
                    {
                        FirstName,
                        LastName,
                        Gender,
                        DOB,
                        Address,
                        ContactAddress,
                        PhoneNumber,
                        Education,
                        WorkExp,
                        LangSkill,
                        IdCard,
                        FaceWithIdCard,
                        Avatar,
                    },
                    { new: true }
                )
                return UpdatedAdmin
            } catch (error) {
                console.log(error)
            }


        },
        deleteAdmin: async (_, args) => {
            const { _id } = args;
            try {
                const user = await Admin.findByIdAndDelete(_id);
                return user

            } catch (error) {
                console.log(error)
            }

        },

        //VALIDATE USER
        validateguide: async (_, { _id, approve, text }) => {

            let guide

            try {
                if(approve){
                    guide = await Guide.findByIdAndUpdate(
                        _id,
                        {
                            IsVerified: true,
                            VerifyDate: new Date(),
                            Status: {
                                Tag: GuideStatus[1],
                                Details: []
                            }
                        },
                        {
                            new: true
                        }
                    );
                } else {
                    guide = await Guide.findByIdAndUpdate(
                        _id,
                        {
                            IsVerified: false,
                            Status: {
                                Tag: GuideStatus[2],
                                Details: [text]
                            }
                        },
                        {
                            new: true
                        }
                    );
                }


                return guide

            } catch (error) {
                throw error
            }

        },
    }
}