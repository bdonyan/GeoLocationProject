const { Console } = require('console');
const express = require('express')
const upload = require('express-fileupload')
const fs = require('fs');

const app = express()

app.use(upload())

fs.truncate('locations.json', 0, function(){console.log('done')})
fs.truncate('addresslist.json', 0, function(){console.log('done')})

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/frontpage.html') 
    console.log("description file opened")
})

app.get('/gmap.html',(req,res) => {
    res.sendFile(__dirname + '/gmap.html') 
    console.log("HTML file opened")
})

app.get('/send',(req,res) => {
    const execSync = require('child_process').execSync;
        // import { execSync } from 'child_process';  // replace ^ if using ES modules
        const output = execSync('go run "randomip.go"', { encoding: 'utf-8' });  // the default is 'buffer'
        console.log('Output was:\n', output);
    res.download('addresslist.json')
    res.sendFile(__dirname + '/generateinput.html') 
    console.log("HTML file opened")
})

app.get('/generateinput.html',(req,res) => {
    res.sendFile(__dirname + '/generateinput.html') 
    console.log("HTML file opened")
})

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

        const execSync = require('child_process').execSync;
        // import { execSync } from 'child_process';  // replace ^ if using ES modules
        const output = execSync('go run "ip2location.go"', { encoding: 'utf-8' });  // the default is 'buffer'
        console.log('Output was:\n', output);

        res.redirect("/gmap.html");
    }
})

app.get('/test', function(req, res, next) {
    var obj = JSON.parse(fs.readFileSync('locations.json', 'utf8'));
    res.json(obj);
});

app.listen(process.env.PORT, function() {
    console.log("Server started successfully on port 5000.")
})
