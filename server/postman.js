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

webserver.post('/run', function(req, res) {
    let methods = require('./methods.json');
    let tempMethod = null;
    console.log(req.body);
    for (let i = 0; i < methods.length; i++) {
        if (methods[i].id == req.body.id) {
            tempMethod = methods[i];
        };
    };
    console.log(tempMethod.url);

    let urlParams = tempMethod.url;
    if (tempMethod.query != null) {
        urlParams = urlParams + '?';
        for (let i = 0; i < tempMethod.query.length; i++) {
            if (i == 0) {
                urlParams = urlParams + tempMethod.query[i];
            } else {
                urlParams = urlParams + '&' + tempMethod.query[i];
            }
        }
    };

    
    let requestParams = {};
    requestParams.method = tempMethod.method;

    if (tempMethod.headers != null) {
        requestParams.headers = tempMethod.headers;
    };
    
    if (tempMethod.body != null) {
        requestParams.body = tempMethod.body;
    };

    isoFetch(urlParams, requestParams
    )
    .then(response => {
        if(!response.ok) {
            throw new Error('fetch error ' + response.status);
        } else {
        return response.text();
        }
    })
    .then (data => {
        console.log(data);
        res.send(data);
    })
    .catch(error => {
        console.log(error.message);
        res.send(error.message);
    });

    // console.log(proxy_res);
    // res.send(proxy_res);
});

webserver.post('/request', function(req, res) {
    console.log(req.body);
    res.send('vote ok');
    addMethods(req.body);
});

webserver.get('/reqlist', function(req, res) {
    // console.log('/reqlist is there');
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
        tempMethod.url = newMethod.url;
        tempMethod.method = newMethod.method;
        tempMethod.query = newMethod.query;
        tempMethod.headers = newMethod.headers;
        tempMethod.body = newMethod.body;
        methods.push(tempMethod);
    };

    let data = JSON.stringify(methods, null, 2);
    fs.writeFileSync('./server/methods.json', data);
}

webserver.listen(port, () => {
    console.log('web server running on port ' + port);
});