const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const dbConnect = async () => {

    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB CONNECTED');
    } catch (error) {
        console.log(error);
        process.exit(1); //stop app in case of error
    }
}

module.exports = dbConnect;