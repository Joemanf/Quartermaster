const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { User, Tag, UserTag } = require('../../db/models');

const router = express.Router();

// Get all of the tags 
router.get('/', async (req, res) => {
    const tags = await Tag.findAll();
    return res.json(tags) // Goes to the store
})

router.post( // Look at this
    '/userTags',
    asyncHandler(async (req, res) => {

        //1. Query Tags table
        //2. If tag and user association exists, send it back?
        //2.5 Might have something to do with assigning userId
        //3. Else create and send new one
        const { userId, tagId } = req.body // Query tags table

        const tags = await Tag.findAll({
            where: { id: tagId }
        })
        console.log(`AAAAAAAAAAAAAAAAAAAAAAAAA`, tags)

        const userTag = await UserTag.create({ tagId, userId })
        if (userTag) return res.json({ userTag })
    })
)

// Grab all usertags for front end to evaluate what tags are followed
router.post('/grab-user-tag', asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const userTags = await UserTag.findAll({
        where: { userId }
    })
    return res.json(userTags); // Goes to the store
}))

// // Create a tag association for users
// router.post(
// 	'/:id',
// 	// validateQuestion,
// 	asyncHandler(async (req, res, next) => {
// 		const { name, userId } = req.body
// 		const tagId = req.params.id

// 		const userTag = UserTag.build({ userId, tagId })

// 		if (userTag) {
// 			await userTag.save()
// 			return res.json({ userTag }) // Goes to the store
// 		} else {
// 			const err = new Error('Post failed')
// 			err.status = 401
// 			err.title = 'Post failed'
// 			err.errors = ['The provided values were invalid.']
// 			return next(err)
// 		}
// 	})
// )

// Delete a tag association for users
router.delete(
    '/:id',
    asyncHandler(async (req, res, next) => {
        const { userId, tagId } = req.body
        const deleteUserTag = await UserTag.findAll({
            where: { userId, tagId },
        })
        deleteUserTag.map(async (userTag) => await userTag.destroy())
        return res.json({ userId })
    })
)

module.exports = router
