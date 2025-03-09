//Connect with the database

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { mongoDBURL } from '../../config';

dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect(mongoDBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); 
    }
};

export default connectDB;