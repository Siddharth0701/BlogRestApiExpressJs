const exprees=require('express');
const postController=require('../controllers/post.controller');
const router=exprees.Router();
router.post("/", postController.save);
router.get("/",postController.index);
router.get("/:id",postController.show);
router.patch("/:id",postController.update);
router.delete("/:id",postController.deletePost)



module.exports=router;

