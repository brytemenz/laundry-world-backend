const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Mongoose is connected");
    });

    await mongoose.connect(uri);
  } catch (error) {
    console.log(error);
  }
};


module.exports = connectDB;