const router = require('express').Router()
const sessionRouter = require('./session.js')
const usersRouter = require('./users.js')
const tagRouter = require('./tag.js')
const questionRouter = require('./question.js')
const answerRouter = require('./answer.js')

router.use('/session', sessionRouter)

router.use('/users', usersRouter)

router.use('/tag', tagRouter)

router.use('/question', questionRouter)

router.use('/answer', answerRouter)

// Might need to add question

module.exports = router
