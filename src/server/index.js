const express = require('express');
const app = express();
const cors = require('cors');
var fs = require('fs');
app.use(express.json());

app.use(cors());
app.get('/', (req, res) => {
    console.log("server running")
})

app.post('/addpost', (req, res) => {
    // const {
    //     file,
    //     body: { post }
    // } = req;
    // console.log(file, body)
    console.log("file",req.myfile);
})

app.listen(3001, () => { console.log("server running...") })