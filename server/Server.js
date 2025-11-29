
const express = reuire('express');
const app = express() 

app.get('/', (req, res)=>{
    res.send('Task Manager Server is Running')
})



app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})