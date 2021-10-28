const mongoose = require('mongoose');

module.exports = async function connection() {
    try {
        mongoose.Promise = global.Promise;

        await mongoose
            .connect(process.env.DB, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })
        console.log('📟  MonggoDB is Connected!')
    } catch (error) {
        console.log(error);
        console.log('📛 Could not connect to MongoDB');
    }
};