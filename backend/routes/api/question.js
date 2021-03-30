const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { Question, QuestionTag } = require('../../db/models');

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
        const { title, body, tagIds, userId } = req.body;

        console.log(req.body)

        const question = Question.build({ title, body, userId });


        const validatorErrors = validationResult(req);

        if (validatorErrors.isEmpty()) {
            await question.save();
            console.log(`Sweet Berries`, question)
            tagIds.map(async (questionNum) => {
                const questionTags = QuestionTag.build({ questionId: question.id, tagId: questionNum });
                await questionTags.save();
            })

            return res.json({ question }) // Goes to the store
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