require('dotenv').config();

const Extensions = require('../../../Db/db.json')

exports.ExtensionstionQuery = {
    Query: {
        getPeriod: () => {
            return Extensions.PeriodStatus
        }
    }
}