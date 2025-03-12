const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://nakshatrarm:nakshu2048@cluster0.5nuto.mongodb.net/farmiee?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Wait 5s before failing
    });

    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = mongoDB;
