const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie } = require('../../utils/auth');
const { Question } = require('../../db/models');

const router = express.Router();

const validateQuestion = [
    check('title')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a title.'),
    check('body')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a brief clarification.'),
    handleValidationErrors,
];


// Post a question
router.post(
    '/',
    validateQuestion,
    asyncHandler(async (req, res, next) => {
        const { title, body, userId } = req.body;

        const question = Question.build({ title, body, userId });

        const validatorErrors = validationResult(req);

        if (validatorErrors.isEmpty()) {
            await question.save();
            // res.redirect(`/question/${question.id}`);
            return res.json({ question })
        } else {
            const err = new Error('Post failed');
            err.status = 401;
            err.title = 'Post failed';
            err.errors = ['The provided values were invalid.'];
            return next(err);
        }
    }),
);

module.exports = router;