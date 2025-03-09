import dotenv from 'dotenv';
//Configeration file
dotenv.config();

export const PORT = process.env.PORT || 5555;
export const mongoDBURL = process.env.DB;