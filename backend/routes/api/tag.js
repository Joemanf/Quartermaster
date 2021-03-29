const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { User, Tag, UserTag } = require('../../db/models');

const router = express.Router();

// Create a tag association for users
router.post(
    '/:id',
    // validateQuestion,
    asyncHandler(async (req, res, next) => {
        const { name, userId } = req.body;
        const tagId = req.params.id;

        const userTag = UserTag.build({ userId, tagId });

        if (userTag) {
            await userTag.save();
            return res.json({ userTag })
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