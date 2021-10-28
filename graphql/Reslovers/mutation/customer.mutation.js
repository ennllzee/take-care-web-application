require('dotenv').config();
const bcrypt = require('bcryptjs');
const verify = require('../../../helpers/googleOauthForCustomer')

const Appointment = require('../../../models/appointment.model')
const GuideSchedule = require("../../../models/guideworkschedule.model")
const Customer = require('../../../models/customer.model')

exports.CustomerMutation = {
    Mutation: {
        createdCustomer: async (parent, args, context, info) => {
            const {
                FirstName,
                LastName,
                Gender,
                DOB,
                PhoneNumber,
                Email,
                EmergencyTel,
                Avatar,
                CongenitalDisorders,
                Token,
            } = args.input;

            const { userid, Gmail } = await verify(Token).catch((error) => { throw error });

            const hashedGoogleId = await bcrypt.hash(userid, 12);

            try {

                if (Email === undefined || Email === null) {
                    Email = Gmail
                }

                const user = new Customer({
                    FirstName,
                    LastName,
                    Gender,
                    DOB,
                    PhoneNumber,
                    Email,
                    EmergencyTel,
                    Avatar,
                    CongenitalDisorders,
                    Gmail,
                    GoogleId: hashedGoogleId,
                    Role: "customer"
                });

                await user.save();
                return user
            } catch (err) {
                throw err;
            }
        },
        updateCustomer: async (parent, args, context, info) => {
            const { _id } = args
            const {
                FirstName,
                LastName,
                Gender,
                DOB,
                PhoneNumber,
                EmergencyTel,
                CongenitalDisorders,
            } = args.input;

            try {
                const UpdatedCustomer = await Customer.findByIdAndUpdate(
                    _id,
                    {
                        FirstName,
                        LastName,
                        Gender,
                        DOB,
                        PhoneNumber,
                        EmergencyTel,
                        CongenitalDisorders,
                    },
                    { new: true }
                )

                return UpdatedCustomer
            } catch (error) {
                console.log(error)
            }


        },
        deleteCustomer: async (parent, args, context, info) => {
            const { _id } = args;
            try {
                // const usersAppointment = Appointment.find({ Customer: _id, $or: [{ BeginTime: null }, { EndTime: null }] });
                const user = await Customer.findByIdAndDelete(_id);
                return user
            } catch (error) {
                console.log(error)
            }

        },

    }
}