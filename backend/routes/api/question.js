const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { jwtConfig } = require('../../config');

const { secret, expiresIn } = jwtConfig;

const { handleValidationErrors } = require('../../utils/validation');
const { getCurrentUserId } = require('../../utils/auth');
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
    const id = await getCurrentUserId(req);
    const userTags = await UserTag.findAll({
        where: { userId: id }
    })

    const questions = await Question.findAll({
        // Change ability to view feed questions here
        // include: { Users }
        // where: { id: tagId }
    });

    return res.json(questions)
}))

router.get('/:id', asyncHandler(async (req, res) => {

    const id = req.params.id;

    const question = await Question.findByPk(id);

    return res.json(question)
}))

// Post a question
router.post(
    '/',
    validateQuestion,
    asyncHandler(async (req, res, next) => {
        const { title, body, tagIds, userId } = req.body;

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