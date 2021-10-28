require('dotenv').config();
const Admin = require('../../../models/admin.model')
const Guide = require('../../../models/guide.model')
const Customer = require('../../../models/customer.model')

exports.UserQuery = {
    Query: {
        getAllUser: async () => {
            try {
                const guideUser = await Guide.find()
                const adminUser = await Admin.find()
                const customerUser = await Customer.find()
                const ConcatSumary = await guideUser.concat(adminUser).concat(customerUser);
                return ConcatSumary
            } catch (error) {
                console.log(error)
            }
        },
    }
}