const { dateresolver } = require("../../helpers/index")

exports.RecordResolver = {
    Record: {
        At: ({ At }) => {
            return dateresolver(At)
        }
    }
}