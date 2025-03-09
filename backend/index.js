import express, { request, response } from "express";
import {PORT} from "./config.js";
import mongoose from "mongoose";
import cors from 'cors';
import userRouter from './src/routes/userRoutes.js'
import noteRoutes from './src/routes/noteRoutes.js'
import connectDB from './src/config/db.js';


const app= express();

app.use(express.json());

app.use(cors());

app.use('/user',userRouter);
app.use('/', noteRoutes);

connectDB();

app.listen( PORT,()=>{
    console.log(`connected ${PORT}`);
})