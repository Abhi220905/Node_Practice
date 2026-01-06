const express = require('express')
const app = express()

app.set("view engine", "ejs")
require("dotenv").config()

const PORT = process.env.PORT || 5000


// understand the browser which type of data are passed
app.use(express.json()) // row data (Obj format)
app.use(express.urlencoded())  // urlencoded data ' older version package parcel

app.get('/api', (req, res) => {
    res.send("Server Running")
})


// send data in postman 
app.get("/api/user", (req, res) => {
    res.send({
        success: true,
        records: arr
    })
})


//receive data from the Postman

let arr = [];
app.post("/api/user", (req, res) => {
    // console.log(req.body)  // (undefined) error -> bcz server cant be understand which type of data are sending 
    // res.send(req.body)  
    // res.send("Inserted")

    const {Name , Email} = req.body; //chahe jitna hi data ho , jitna data pass karenge utna hi data jayega; 
    arr.push({Name, Email})
    // res.send(arr)

    // Self Pass Obj
    res.send({
        success: true,
        message: "Data Added"
    })
})


app.listen(PORT, () => console.log(`server is connected http://localhost:${PORT}/api`))