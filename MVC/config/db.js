
// DataBase connection

const { default: mongoose } = require("mongoose");

const dbConfig = () => {
    // databse name -: dont use colon (:) 
    mongoose.connect(process.env.DB_URL)
        .then(() => console.log("db Connected❤️"))
        .catch((error) => console.log(error))
}

module.exports = dbConfig