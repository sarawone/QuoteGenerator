// when user click get the quote fetch data from backend
let btnGet = document.getElementById('btnQuote');
let boxCont = document.getElementById('boxQuote');
let quoteText = document.getElementById('quoteCont');
let authText = document.getElementById('autCont');


boxCont.style.border = "1px solid #333";
boxCont.style.borderRadius = "10px";

btnGet.addEventListener('click',async () =>{
    try{
        const response = await fetch('http://localhost:3000/api/data');
        const data = await response.json();
        
        quoteText.textContent = `"${data.quote}"`;
        authText.textContent = `~${data.author}`;
    }
    catch(err)
    {
        console.error(`Error fetching data ${err}`);
        boxCont.textContent = "Fait to fetching data";
    }
   
});