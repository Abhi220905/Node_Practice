const express = require('express')
const { default: mongoose, Schema, model } = require('mongoose')
const app = express()

require('dotenv').config() // Always on the top of declear
app.use(express.urlencoded())
app.use(express.json())


const PORT = process.env.PORT || 5000

mongoose.connect(process.env.DB_URL)
    .then(() => { console.log("db connected❤️") })
    .catch(error => console.log(error));


app.get("/", (_, res) => {
    res.send("Server Connect")
})


// create Schema and Table name

// const userSchema = new mongoose.Schema({})  # another way to import schema 
const userSchema = new Schema({
    username: String,
    grid: Number,
    status: Boolean
})


//// table name


const user = model('User', userSchema)



//////// LOGIC  (CONTROLLER AND ROUTING(ENDPOINT))

app.post('/api/users', (req, res) => {
    // console.log(req.body);

    try {
        const { username, grid, status } = req.body;
        user.create({ username, grid, status })
            .then(() => res.json("Data Inserted"))
            .catch((err) => res.json(err.message))
    } catch (error) {
        console.log(error.message)
    }
})


app.get('/api/users', async (req, res) => {
    const records = await user.find()

    // res.json({
    //     success: true,
    //     records : records.length > 0 ? records : "No Records"
    // })

    if (records.length > 0) {
        res.json({
            success: true,
            records: records
        })
    } else {
        res.json({
            success: false,
            records: "No Records"
        })
    }
})


/// delete 

app.delete('/api/users/:id', async (req, res) => {
    // console.log(req.params)
    const { id } = req.params;
    await user.findByIdAndDelete(id)
        .then(() => {
            res.json({
                success: true,
                message: "User has been deleted"
            })
        })
        .catch((err) => {
            res.json({
                success: false,
                message: err.message
            })
        })
})

app.get('/api/users/:id', async (req, res)=>{
    const records = await user.findById(req.params.id)
    .then((records) => {
            res.json({
                success: true,
                records : records || "No Records"
            })
        })
        .catch((err) => {
            res.json({
                success: false,
                message: err.message
            })
        })
})


app.listen(PORT, () => console.log(`Application running in port number http://localhost:${PORT}`))
