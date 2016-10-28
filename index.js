"use strict";
const express = require('express');
const app = express();
let shows = [];

app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').json());

app.route('/show')
    .get((req, res) => {
        res.json(shows);
    })
    .post((req, res) => {
        shows.push(req.body);
        res.sendStatus(200);
    });

app.route('/shows')
    .get((req, res) => {
        res.json(shows);
    });

app.listen(8080, () => {console.log('listening');});
