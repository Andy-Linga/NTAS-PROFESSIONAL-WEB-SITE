const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false); // Option pour éviter les avertissements

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Database Connection Error:', error);
    process.exit(1); // Arrête le serveur si la connexion échoue
  }
};

module.exports = connectDB;
