const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI_LOCAL);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {db};