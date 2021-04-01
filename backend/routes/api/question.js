const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { Question, QuestionTag, UserTag } = require('../../db/models');

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

// View all questions associated with user's feed
router.get('/', asyncHandler(async (req, res) => {

    // 1.) Get the UserId of the user logged in
    // 2.) Get the tags associated with that user
    // 3.) Get the questions associated with that tag
    // 4.) Send back all of those questions
    // const token = req.get()
    // console.log(token)
    // res.json({ req })

    const questions = await Question.findAll({
        // where: tagId
    });
}))

// Post a question
router.post(
    '/',
    validateQuestion,
    asyncHandler(async (req, res, next) => {
        const { title, body, tagIds, userId } = req.body;

        // console.log(req.body)

        const question = Question.build({ title, body, userId });


        const validatorErrors = validationResult(req);

        if (validatorErrors.isEmpty()) {
            await question.save();
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