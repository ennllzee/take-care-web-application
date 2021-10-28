require('dotenv').config();
const bcrypt = require('bcryptjs');
const verify = require('../../../helpers/googleOauthForCustomer')

const Customer = require('../../../models/customer.model')

exports.CustomerQuery = {
    Query: {
        getAllCustomer: async () => {
            try {
                return await Customer.find()
            } catch (error) {
                console.log(error);
            }

        },
        getCustomer: async (_, args) => {
            const { _id } = args
            try {
                return await Customer.findById(_id)
            } catch (error) {
                console.log(error);
            }

        },
        loginCustomer: async (_, args) => {
            const { Token } = args

            const { userid, Gmail } = await verify(Token).catch((error) => { throw error });
            
            try {
                
                const user = await Customer.findOne({ Gmail });
                let isEqual 
                if(user){
                     isEqual = await bcrypt.compare(userid, user._doc.GoogleId);
                }
               if (!isEqual) {
                    throw new Error('Login Failed');
                }

                return user;

            } catch (error) {
                console.log(error)
            }

        }
    }
}