const router = require('express').Router()
const sessionRouter = require('./session.js')
const usersRouter = require('./users.js')
const tagRouter = require('./tag.js')
const questionRouter = require('./question.js')

router.use('/session', sessionRouter)

router.use('/users', usersRouter)

router.use('/tag', tagRouter)

router.use('/question', questionRouter)

// Might need to add question

module.exports = router
