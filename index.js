const express = require ('express');
const fs = require('fs');
const path = require ("path");
const app = express();
// const bodyParser = require ('body-parser')
// app.use(bodyParser.json())

app.get('/' , (req,res) => {
    res.send("Server starter")
})

app.post("/createfile", (req,res) => {
    const currentDate = new Date()
    const fileContent = currentDate.toLocaleTimeString("en-GB");
    const filename = currentDate.toLocaleString().replace(/[/: ,]/g , ".");
    const newFileName = `${filename}.txt`;
    const folderPath = "files";

    const filePath = path.join(folderPath , newFileName) 

    fs.writeFile( filePath , fileContent , (err) => {
       if(err) {
         res.send("Error creating file")
       } else {
         res.sendFile(path.join(__dirname , `/files/${newFileName}`));
       }
    })
 })
  

app.get('/retrievefiles' , (req,res) => {
    const folderPathIs = 'files'
    fs.readdir(folderPathIs ,(err , totalFiles) => {
        if(err){
            res.send("Error fetching content inside the file")
        } else {
            res.send(totalFiles)
        }
    })
})


app.listen(4003,()=>{
    console.log("Server started successfully")
})