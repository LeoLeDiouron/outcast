const express = require('express');
const router = express.Router();

const gameManager = require('../controllers/game-manager');

router.use(express.json());

router.get("/start_game", gameManager.startGame)

router.get("/events", gameManager.getEvent);
router.post("/events", gameManager.postChoice);

router.get("/context", gameManager.getContext)

router.get('*', gameManager.notFound)

module.exports = router;