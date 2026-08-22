
let btnGet = document.getElementById('btnQuote');
let boxCont = document.getElementById('boxQuote');
let quoteText = document.getElementById('quoteCont');
let authText = document.getElementById('autCont');


let submitForm  = document.getElementById('quoteForm');
let statusMsg = document.getElementById('statusMsg');


boxCont.style.border = "1px solid #333";
boxCont.style.borderRadius = "10px";

// Automatically selects localhost for local testing OR  live domain on Coolify
const API_BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:3000'
  : 'https://i5wi51lvo0j3sv9ngh67eayb.trainees.hosting.cyf.academy';

const API_URL = `${API_BASE_URL}/api/data`;


// when user click get the quote fetch data from backend
btnGet.addEventListener('click',async () =>{
    try{
       //const response = await fetch('http://localhost:3000/api/data'); //for local host

        //const response = await fetch('https://i5wi51lvo0j3sv9ngh67eayb.trainees.hosting.cyf.academy'); // for deployed server

        const response = await fetch (API_URL);
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

//When user click the submit, send data to backend and show the status
submitForm.addEventListener('submit', async (e)=>{
    e.preventDefault(); // prevent page reload while form submit

    //Extract input values
    let authorValue = document.getElementById('author').value.trim();
    let quoteValue = document.getElementById('quote').value.trim();

    // Data validation 
    if(!authorValue || !quoteValue)
    {
        statusMsg.textContent = "Fields cannot blank";
        return;
    }

    //send data to backend 
    try{
        /*
        const response = await fetch('http://localhost:3000/api/data',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                quote:quoteValue,
                author:authorValue
            })
        });  //for local host
        */

       
       /* const response = await fetch('https://i5wi51lvo0j3sv9ngh67eayb.trainees.hosting.cyf.academy',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                quote:quoteValue,
                author:authorValue
            })
        }); */
        //for deploy host

        const response = await fetch(API_URL,{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quote:quoteValue,
                author: authorValue
            })
        });
        

        const result = await response.json();

        if(response.ok){
            statusMsg.textContent = "Quote Saved Successfully!";
            statusMsg.style.color = "green";
            submitForm.reset();

            quoteText.textContent = `"${result.data.quote}"`;
            authText.textContent = `~${result.data.author}`;
        }
        else
        {
            statusMsg.textContent = result.error || "Fail to save quote.";
            statusMsg.style.color = "red";
        }

    }
    catch(err)
    {
            console.error ("Error submitting form:",err);
            statusMsg.textContent = "Server Error";
            statusMsg.style.color = "red";
    }


});