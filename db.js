const colors = require('colors');
const mongoose = require('mongoose');

async function connectDB() {
  mongoose.set('strictQuery', true);
  await mongoose
    .connect(process.env.MONGO_URI)
    .then((conn) => {
      console.log('conneceted succesfully to database...'.yellow);
    })
    .catch((err) => {
      console.log('connection to DB faild with the error:👉'.red, err);
    });
}

module.exports = connectDB;
