const express = require('express');
const router = express.Router();

router.get("/event", (req, res) => {
    res.status(200).json({
        msg: "Everything is ok"
    });
});

router.get('*', (req, res) => {
    res.status(400).json({
        msg: "Not found"
    });
})

module.exports = router;