const express = require('express');

const router = express.Router();

const apiRouter = require('./api');

router.use('/api', apiRouter);

router.get('/', (req, res) => {
    res.json({ hey: 'man' })
})

module.exports = router;