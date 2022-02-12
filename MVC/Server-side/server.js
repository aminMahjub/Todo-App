const { json } = require('express');
const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.static('../public'));
app.use(express.json());

app.listen(9090, () => {
    console.log('Listening on the 9090');
});

app.post('/upload', (req, res) => {
    const data = JSON.stringify(req.body);
    fs.writeFile('../load-tasks.txt', data, (err) => {
        console.log(err);
    });
})

app.get('/download', (req, res) => {
    fs.readFile('../load-tasks.txt', (err, data) => {
        res.sendFile(__dirname + './')
    })
})

app.get('/signin', (req, res) => {
    res.sendFile('F:/CS internship/Project/Todo app/MVC/public/signin.htm');
})

app.post('/getusers', (req, res) => {
    fs.readFile('../data-base.txt', (err, users) => {
        res.sendFile(__dirname + './');
    });

    const data = JSON.stringify(req.body);
    console.log(req.body);
    fs.writeFile('../data-base.txt', data, (err) => {
        console.log(err);    
    });
})

app.get('/sendUsers', (req, res) => {
    fs.readFile('../data-base.txt', (err, users) => {
        res.send(users);
    });
})

app.get('/login', (req, res) => {
    res.sendFile('F:/CS internship/Project/Todo app/MVC/public/singup.htm');
})
