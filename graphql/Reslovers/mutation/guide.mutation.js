require('dotenv').config();
const bcrypt = require('bcryptjs');
const verify = require('../../../helpers/googleOauthForGuide')
const { GuideStatus, ReviewStatRating } = require('../../../Db/db.json')

const Guide = require('../../../models/guide.model')
const GuideSchedule = require("../../../models/guideworkschedule.model")

exports.GuideMutation = {
    Mutation: {
        createdGuide: async (parent, args, context, info) => {
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
                FaceWithIdCard,
                Avatar,
                Token,
            } = args.input;


            const { userid, Gmail } = await verify(Token).catch((error) => { throw error });

            const hashedGoogleId = await bcrypt.hash(userid, 12);


            try {

                if (Email === undefined || Email === null) {
                    Email = Gmail
                }

                const user = new Guide({
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
                    FaceWithIdCard,
                    Gmail,
                    GoogleId: hashedGoogleId,
                    Avatar,
                    Role: "guide",
                    Status: {
                        Tag: GuideStatus[0],
                        Details: []
                    },
                });

                await user.save();
                return user

            } catch (err) {
                throw err;
            }
        },
        updateGuide: async (parent, args, context, info) => {
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
            } = args.input;

            try {
                await GuideSchedule.deleteMany({ Createdby: _id, WorkOnMorningAppointment: null, WorkOnAfternoonAppointment: null })
                return await Guide.findByIdAndUpdate(
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
                        IsVerified: false,
                        Status: {
                            Tag: GuideStatus[0],
                            Details: []
                        }
                    },
                    { new: true }
                )

            } catch (error) {
                console.log(error)
            }

        },
        deleteGuide: async (parent, args, context, info) => {
            const { _id } = args;
            try {
                const user = await Guide.findByIdAndDelete(_id);
                return user
            } catch (error) {
                console.log(error)
            }

        },
    }
}