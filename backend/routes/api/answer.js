const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { jwtConfig } = require('../../config');

const { secret, expiresIn } = jwtConfig;

const { handleValidationErrors } = require('../../utils/validation');
const { getCurrentUserId } = require('../../utils/auth');
const { Answer } = require('../../db/models');

const router = express.Router();

router.get('/:questionId', asyncHandler(async (req, res) => {
    const questionId = req.params.questionId;

    const answers = await Answer.findAll({
        where: {
            questionId
        }
    });

    console.log(`===============================================BACKEND ANSWERS?`, answers)

    if (answers.length) {
        return res.json(answers)
    }
    else return false;
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