const express = require('express');
const asyncHandler = require('express-async-handler');

const { Tag, UserTag } = require('../../db/models');

const router = express.Router();

// Get all of the tags 
router.get('/', async (req, res) => {
    const tags = await Tag.findAll();
    return res.json(tags) // Goes to the store
})

router.post(
    '/userTags',
    asyncHandler(async (req, res) => {
        const { userId, tagId } = req.body
        const tags = await Tag.findAll({
            where: { id: tagId, userId },
        })
        let userTag;

        if (tags.length) {
            return res.json(tags)
        }


        if (userId) {
            userTag = await UserTag.create({ tagId, userId })
            const updatedTag = await Tag.update({ userId }, { where: { id: tagId } });
        }
        if (userTag) return res.json({ userTag })
        else return false;
    })
)


// Delete a tag association for users
router.delete(
    '/:id',
    asyncHandler(async (req, res, next) => {
        const { userId, tagId } = req.body
        const deleteUserTag = await UserTag.findAll({
            where: { userId, tagId },
        })

        console.log(`TAG, USER`, tagId, userId)
        const updatedTag = await Tag.update({ userId: null }, { where: { id: tagId } });

        deleteUserTag.map(async (userTag) => await userTag.destroy())
        return res.json({ userId })
    })
)

module.exports = router
