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
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});*/

app.use(express.static(rootPath));
app.use(express.json());

// apply router to the express app
app.use('/api/v1', routerApi);

app.get('/', (req, res) => { res.sendFile(path.resolve(file)); });

app.listen(port, function() { console.log("Server running at: http://localhost:" + port) });