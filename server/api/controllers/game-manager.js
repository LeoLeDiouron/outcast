const sessionsManager = require('./sessions-manager');
const eventsManager = require('./events-manager');

let games = {};

async function startGame(req, res) {
    const token = sessionsManager.createSession(req, res);
    games[token] = await sessionsManager.createGame();
    console.log(JSON.stringify(games));
}

function getEvent(req, res) {
    console.log("____________GET EVENT____________")
    const token = req.headers.authorization;
    console.log(token);
    const event = eventsManager.getRandomEvent(games[token]);
    res.status(200).json(event);
}

function postChoice(req, res) {
    console.log("____________POST EVENT____________")
    const token = req.headers.authorization;
    const idEvent = req.body.id_event;
    const idChoice = req.body.id_choice;
    games[token] = eventsManager.modifyContext(games[token], idEvent, idChoice);
    res.status(201).json({});
}

function getContext(req, res) {
    const token = req.headers.authorization;
    res.status(200).json(games[token].context);
}

function notFound(req, res) {
    res.status(400).json({
        msg: "Not found"
    });
}

module.exports = {
    startGame: startGame,
    getEvent: getEvent,
    postChoice: postChoice,
    getContext: getContext,
    notFound: notFound
}