const express = require('express');
const asyncHandler = require('express-async-handler');

const { Answer } = require('../../db/models');

const router = express.Router();

router.get('/:questionId', asyncHandler(async (req, res) => {
    const questionId = req.params.questionId;
    const answers = await Answer.findAll({
        where: {
            questionId
        }
    });
    return res.json(answers)
}))

router.post('/', asyncHandler(async (req, res) => {
    const { body, userId, questionId } = req.body;

    const answer = await Answer.create({
        body,
        userId,
        questionId
    });

    return res.json({ answer });
}))

module.exports = router;