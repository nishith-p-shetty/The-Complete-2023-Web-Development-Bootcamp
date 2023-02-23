const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to Express');
});

app.get('/hello', (req, res) => {
    res.send('<h1><em>Hello World!</em></h1>');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});