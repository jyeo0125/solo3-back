const models = require('../models')
const postController = {}
//////Create Post After Login//////
postController.create = async (req, res) =>{
    try {
        const user = await models.user.findOne({
            where:{
                id: req.headers.authorization
            }
        })
        const post = await user.createPost({
            title: req.body.title,
            content: req.body.content
        })
        res.json({post})
    } catch (error) {
        console.log(error);
        res.json({error:error.message})
    }
}


//////// Get All post from same userId/////

postController.allPostbyUserId= async (req,res) =>{
    try {
        const post = await models.post.findAll({
            where: {
                userId: req.params.userId
            }
        })
        res.json({post})
    } catch (error) {
        res.json({error:error.message})
    }
}


///////Post Update/////////
postController.postUpdate = async (req,res) =>{
    try {
        const post = await models.post.findOne({
            where:{
                id: req.params.id
            }
        })
        let update = await post.update(req.body)
        res.json({update})
    } catch (error) {
        res.json({error:error.message})
    }
}
///////////Delete the post////////////////
postController.deletePost = async (req,res)=>{
    try {
        const user = await models.user.findOne({
            where: {id: req.headers.authorization}
        })

        const post = await models.post.findOne({
            where:{
                id: req.params.postid
            }
        })
        await user.removePost(post)
        await post.destroy()
        res.json({message:"delete done!"})

    } catch (error) {
        res.json({error:error.message})
    }
}








module.exports = postController;