const express = require('express')
const crypto = require('crypto')

const app = express()

// app.set("view engine", "ejs")
require("dotenv").config()

const PORT = process.env.PORT || 5000


// understand the browser which type of data are passed
app.use(express.json()) // row data (Obj format)
app.use(express.urlencoded())  // urlencoded data ' older version package parcel

app.get('/api', (req, res) => {
    res.send("Server Running")
})

let arr = [];

// insert data
app.get("/api/user", (req, res) => {
    res.send({
        success: true,
        records: arr
    })
})

// get single data
app.get("/api/user/:id", (req, res) => {
    const user = arr.find(ele=> ele.id === req.params.id)
    res.send({
        success: true,
        records: user
    })
})

//receive data from the Postman
// get data

app.post("/api/user", (req, res) => {
    // console.log(req.body)  // (undefined) error -> bcz server cant be understand which type of data are sending 
    // res.send(req.body)  
    // res.send("Inserted")

    const { Name, Email } = req.body; //chahe jitna hi data ho , jitna data pass karenge utna hi data jayega; 
    arr.push({ Name, Email, id: crypto.randomUUID() })
    // res.send(arr)

    // Self Pass Obj
    res.send({
        success: true,
        message: "Data Added"
    })
})


///// Delete APi

app.delete("/api/user/:userId", (req, res) => {
    // console.log(req.params)
    // res.send(req.params.userId) 
    const { userId } = req.params // DeStructuring
    const filterData = arr.filter((ele) => {
        return ele.id !== userId

    })
    arr = filterData
    res.send({
        success: true,
        message: "user has been deleted"
    })
})


//// Update API

app.put("/api/user", (req, res) => {
    const { id } = req.query
    const { Name, Email } = req.body

    const index = arr.findIndex(ele => ele.id === id)
    if (index != -1) {
        arr[index] = { Name, Email, id }
    }
    res.send({
        success: true,
        message: "user has been updated"
    })

})


app.listen(PORT, () => console.log(`server is connected http://localhost:${PORT}/api`))