const fs = require('fs')
// const { console } = require('inspector')
fs.writeFile("hello.html","<h1>hello world</h1>",(err)=>{
    if(err){
        clg(err)
    }else{
        console.log("file created")
    }
})
fs.readFile("hello.html","utf-8",(err,ele)=>{
    if(err) console.log(err)
        else console.log(ele)
})