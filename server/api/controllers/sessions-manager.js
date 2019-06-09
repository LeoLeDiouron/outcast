const fs = require('fs');
const path = require('path');

const rootPath = __dirname + '/../../../ressources/game_data/';
const pathEventsFile = rootPath + "events.json";
const pathContextFile = rootPath + "context.json";
const tokenChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
const tokenSize = 25;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function generateToken() {
    let token = "";

    for (let i = 0; i < tokenSize; i++) {
        token += tokenChars[getRandomInt(tokenChars.length)];
    }
    return token;
}

function createSession(req, res) {
    const token = generateToken();

    res.status(200).json({
        token: token
    });
    return token;
}

function getDataJsonFile(file) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function createGame() {
    let game = {
        events: {},
        context: {},
        available_events: []
    };

    game.events = getDataJsonFile(pathEventsFile);
    game.context = getDataJsonFile(pathContextFile);
    game.available_events.push(1);
    return game;
}

module.exports = {
    createSession: createSession,
    createGame: createGame
}