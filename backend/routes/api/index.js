const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const questionRouter = require('./question.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/question', questionRouter)

module.exports = router;