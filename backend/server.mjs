import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 3000;




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

app.listen(PORT, () =>{
    console.error(`Port listening on ${PORT}`)
});