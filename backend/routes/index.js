const express = require('express');

const router = express.Router();

router.get('/hello/world', function (req, res) {
    console.log(req.csrfToken)
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!');
});

module.exports = router;