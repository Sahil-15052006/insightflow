import express from 'express';
import uploadFileRouter from './routes/route.uploadFile.js';
import connectDB from './database/db.js';

const app = express();
app.use(express.json());

connectDB();

app.use("/uploadFile",uploadFileRouter)

app.get("/",(req,res)=>{
    res.json({ message:`Insightflow server is runninng.` });
})

export default app;

