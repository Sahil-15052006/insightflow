import express from 'express';
import uploadFileRouter from './routes/route.uploadFile.js';
const app = express();

app.use(express.json());

app.use("/uploadFile",uploadFileRouter)

app.get("/",(req,res)=>{
    res.json({ message:" Insightflow server is running." });
})

export default app;

