const { json } = require('express');
const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.static('./public'));
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

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/signup.htm');
})

app.post('/getusers', (req, res) => {
    fs.readFile('../data-base.txt', (err, users) => {
        res.send(users);
    });

    const users = JSON.stringify(req.body);
    fs.writeFile('../data-base.txt', users, (err) => {
        console.log(err);    
    });

})

app.get('/sendUsers', (req, res) => {
    fs.readFile('../data-base.txt', (err, users) => {
        res.send(users);
    });
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/signin.htm');
})

app.post('/transportationuser', (req, res) => {
    const data = JSON.stringify(req.body);
    fs.writeFile('./user', data ,(err) => {
        console.log(err);
    })
})

app.get('/transportuser', (req, res) => {
    fs.readFile('./user', (err, users) => {
        res.send(users);

    });
})
