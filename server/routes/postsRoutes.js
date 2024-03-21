const {Router} = require('express')
const {createPost,getPost,getPosts,getUerPosts,getCatPosts,editPost,deletePost} = require('../controllers/postController')
const authMiddleWare = require('../middlewares/authMiddleware')
const router = Router()
  router.post("/",authMiddleWare,createPost)
  router.get("/",getPosts)
  router.get("/:id",getPost)
  router.post("/categories/:category",getCatPosts)
  router.get("/users/:id",getUerPosts)
  router.patch("/:id",authMiddleWare,editPost)
  router.delete("/:id",authMiddleWare,deletePost)


module.exports = router