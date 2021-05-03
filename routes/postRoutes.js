const postRoutes = require('express').Router()
const postController = require('../controllers/postController')

postRoutes.post('/', postController.create)
postRoutes.get('/:userId',postController.allPostbyUserId)
postRoutes.put('/:id',postController.postUpdate)
postRoutes.delete('/delete/:postid', postController.deletePost)
postRoutes.get('/:id', postController.onePost)



module.exports = postRoutes;