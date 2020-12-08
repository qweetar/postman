const express = require('express');
const webserver = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const isoFetch = require('isomorphic-fetch');

webserver.set('views', './views');

webserver.use(express.urlencoded({extended: true}));
webserver.use(bodyParser.json());
webserver.use(bodyParser.urlencoded({extended: true}));
webserver.use(express.static(path.resolve(__dirname + '/views')));
webserver.use(cors());

const port = 4095;

webserver.post('/try', async (req, res) => {
    let methods = require('./methods.json');
    let tempMethod = null;
    for (let i = 0; i < methods.length; i++) {
        if (methods[i].id == req.body.id) {
            tempMethod = methods[i];
        };
    };

    webserver.get(tempMethod.url , function(req, res) {
        res.send(req.body);
    });
    
    webserver.post(tempMethod.url , function(req, res) {
        res.send(req.body);
    });

    // const proxy_res = await isoFetch('http://localhost:4095' + tempMethod.url, {
    const proxy_res = await isoFetch('http://46.101.125.193:4095/' + tempMethod.url, {
        method: tempMethod.method,
        headers: {
            'Content-Type': tempMethod.accept
        }
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('fetch error ' + response.status);
        } else {
        return response;
        }
    })
    .then (data => {
        return data;
    })
    .catch(error => {
        console.log(error.message);
    });

    console.log(proxy_res);
    res.status(200).send(proxy_res);
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
        tempMethod.body = newMethod.body;
        methods.push(tempMethod);
    };

    let data = JSON.stringify(methods, null, 2);
    fs.writeFileSync('./server/methods.json', data);
}

webserver.listen(port, () => {
    console.log('web server running on port ' + port);
});