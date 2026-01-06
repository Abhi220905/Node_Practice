const http = require('http')
const fs = require('fs')


const app = http.createServer((req, res) => {

    fs.readFile("hello.html", 'utf-8', (err, ele) => {
        if (err) {
            res.end(err)
        }

        switch (req.url) {
            case "/":
                res.end(ele)
                break;

            case "/about":
                res.end("about")
                break;

            default:
                res.end("Page Not Found");
        }
    })
})
app.listen(9874, () => console.log("Server conected"))