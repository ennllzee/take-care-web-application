const moment = require('moment')
const {PeopleRole,PeriodStatus} = require('../Db/db.json')

exports.dateresolver = (date) => {
    if (date === null) {
        return null
    } else {
        return moment(date).format();
    }

}

exports.moringorafternoon = (date) => {
    const gethour = moment(date).hours()
    if(gethour >= 7 && gethour <= 12 ){
        return PeriodStatus[0]
    }else if(gethour >= 13 && gethour <= 17){ 
        return PeriodStatus[1]
    }
}
