"use strict";
const express = require('express');
const app = express();
let shows = {shows:[]};

app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').json());

app.route('/shows')
    .get((req, res) => {
        res.json(shows);
    })
    .post((req, res) => {
        shows = req.body;
        res.sendStatus(200);
    });

app.listen(8080, () => {console.log('listening');});
