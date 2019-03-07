const express = require('express');
const router = express.Router();

// Register
router.get('/register', (req, res, next) => {
    res.send('REGISTER');
});

module.exports = router;