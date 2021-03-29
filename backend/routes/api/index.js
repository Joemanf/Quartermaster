const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const questionRouter = require('./question.js');
const tagRouter = require('./tag.js')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/question', questionRouter);

router.use('/tag', tagRouter);

module.exports = router;