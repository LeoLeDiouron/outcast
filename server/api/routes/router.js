const express = require('express');
const router = express.Router();

const gameManager = require('../controllers/game-manager');

// Add headers
router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

router.use(express.json());

router.get("/start_game", gameManager.startGame)

router.get("/events", gameManager.getEvent);
router.post("/events", gameManager.postChoice);

router.get("/context", gameManager.getContext)

router.get('*', gameManager.notFound)

module.exports = router;