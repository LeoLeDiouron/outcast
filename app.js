const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

const rootPath = __dirname + '/';
const routerApi = require(rootPath + 'server/api/routes/router');

// define html file of the game (served to the client)
const file = "views/game.html";

// Add headers
/*app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});*/

app.use(express.static(rootPath));
app.use(express.json());

// apply router to the express app
app.use('/api/v1', routerApi);

app.get('/', (req, res) => { res.sendFile(path.resolve(file)); });

app.listen(port, function() { console.log("Server running at: http://localhost:" + port) });