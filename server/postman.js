const express = require('express');
const webserver = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

webserver.set('views', './views');

webserver.use(express.urlencoded({extended: true}));
webserver.use(bodyParser.json());
webserver.use(bodyParser.urlencoded({extended: true}));
webserver.use(express.static(path.resolve(__dirname + '/views')));
webserver.use(cors());

const port = 4095;

webserver.post('/try', function(req, res) {
    let methods = require('./methods.json');
    let tempMethod = null;
    for (let i = 0; i < methods.length; i++) {
        if (methods[i].id == req.body.id) {
            tempMethod = methods[i];
        };
    }
    res.json(tempMethod);
});

webserver.post('/request', function(req, res) {
    console.log(req.body);
    res.send('vote ok');
    addMethods(req.body);
});

webserver.get('/reqlist', function(req, res) {
    console.log('/reqlist is there');
    let methods = require('./methods.json');
    res.json(methods);
});

function addMethods(newMethod) {
    let methods = require('./methods.json');
    let isThereMethod = false;
    for (let i = 0; i < methods.length; i++) {
        if (methods[i].url == newMethod.url) {
            isThereMethod = true;
        };
    };
    if (!isThereMethod) {
        let tempMethod = {};
        tempMethod.id = methods.length + 1;
        tempMethod.url = '/' + newMethod.url;
        tempMethod.method = newMethod.method;
        tempMethod.accept = newMethod.accept;
        methods.push(tempMethod);
    };

    let data = JSON.stringify(methods, null, 2);
    fs.writeFileSync('./server/methods.json', data);
}


webserver.listen(port, () => {
    console.log('web server running on port ' + port);
});