import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());   // to parse json body from frontend
const PORT = 3000;

const saveQuotes = [];




app.get("/api/data",async (req,res) => {

    try{
     const response = await fetch("https://zenquotes.io/api/random"); 
     const quotes = await response.json();
     res.json({
        quote:quotes[0].q,
        author:quotes[0].a
     });

    }
    catch(err)
    {
        console.log(err);
    }

   
});

app.post("api/data",(req,res) => {

    const {quote,author} = req.body;

    //validation check 
    if(!quote || !author)
    {
        return res.status(400).json({error: "Both author & quote are required!"});
    }

    const newEntry = {quote,author,id:Date.now()};
    saveQuotes.push(newEntry);

    return res.status(201).json({
        message: "Quote added successfully",
        data:newEntry});
});

app.listen(PORT, () =>{
    console.log(`Port listening on ${PORT}`)
});