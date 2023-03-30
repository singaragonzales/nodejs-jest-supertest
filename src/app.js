import express from "express"
import {v4} from "uuid";
import getMessage from "./getMessage";

const app = express()

app.use(express.json())

app.get("/", async(req, res) => {
    await new Promise((resolve, reject) =>{
        setTimeout(() => {
            console.log("waiting...")
            resolve(true)
        }, 1000);
    });
    res.send({
        message: getMessage()
    })
})

app.get("/ping", (req, res) => {
    res.send("pong");
})


app.get('/tasks', (req,res) => {
    res.json([])
})

app.post('/tasks', (req,res) => {
    const {title, description} = req.body;

    if(!title || !description) return res.sendStatus(400);

    res.json({
        title,
        description,
        id: v4()
    })
})


export default app;