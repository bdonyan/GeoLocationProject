const { Console } = require('console');
const express = require('express')
const upload = require('express-fileupload')
const fs = require('fs');

const app = express()

app.use(upload())

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/gmap.html') 
    console.log("HTML file opened")
})

//console.log(obj[0].Longitude)

app.post('/',(req,res) => {
    if(req.files) {
        console.log(req.files)
        var file = req.files.file
        var filename = file.name
        console.log(file)

        fs.copyFile(filename, "addresslist.json", (err) => {
            if (err) throw err;
            console.log('file was copied to destination')
        });

        // file.mv('./uploads/'+filename,function(err) {
        //     if (err) {
        //         res.send(err)
        //     } else {
        //         res.send("File uploaded")
        //     }
        // })
        const execSync = require('child_process').execSync;
        // import { execSync } from 'child_process';  // replace ^ if using ES modules
        const output = execSync('go run "ip2location.go"', { encoding: 'utf-8' });  // the default is 'buffer'
        console.log('Output was:\n', output);
    }
})

app.get('/test', function(req, res, next) {
    var obj = JSON.parse(fs.readFileSync('locations.json', 'utf8'));
    res.json(obj);
    });

app.listen(5000, function() {
    console.log("Server started successfully on port 5000.")
})