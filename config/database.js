const mongoose = require('mongoose');

const connectDB = async () => {
    const dbUri = process.env.MONGODB_URI;

    if (!dbUri) {
        console.error('❌ MONGODB_URI is undefined. Please set it in your environment variables.');
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
        return;
    }

    try {
        const conn = await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        // Don't exit process in development, just log the error
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
    }
};

module.exports = connectDB;
