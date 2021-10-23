const { json } = require('express');
const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.static('../public'));
app.use(express.json());

app.listen(9090, () => {
    console.log('Listening on the 9090');
});

app.post('/api', (req, res) => {
    const data = JSON.stringify(req.body);
    fs.writeFile('../load-tasks.txt', data, (err) => {
        console.log(err);
    });
})
