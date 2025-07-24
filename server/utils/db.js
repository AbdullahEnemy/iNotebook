require('dotenv').config();
const mongoose=require("mongoose");
const mongoString = process.env.MongoURL;
console.log("mongoString",mongoString);
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoString, {});
        console.log("Connected to MongoDB successfully");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
};

module.exports = connectToMongo;

