const Validator = require("fastest-validator");
const models = require("../models");
function save(req, res) {
  const post = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.image_url,
    categoryId: req.body.category_id,
    userId: 1,
  };
  //validation
  const schema = {
    title: { type: "string", optional: false, max: "100" },
    content: { type: "string", optional: false, max: "500" },
    categoryId: { type: "number", optional: false },
  };
  const v =new Validator();
 const validationResponce= v.validate(post,schema);
 if (validationResponce!==true) {
    return res.status(400).json({
        message:"Validation failed",
        error:validationResponce
    });
    
 }
 // end validation
  models.Post.create(post)
    .then((result) => {
      res.status(201).json({
        message: "Post create successfully",
        post: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}
function show(req, res) {
  const id = req.params.id;
  models.Post.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Post not found!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went worong !",
      });
    });
}

function index(req, res) {
  models.Post.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went wrong !",
      });
    });
}
function update(req, res) {
  const id = req.params.id;
  const updatedPost = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.image_url,
    categoryId: req.body.category_id,
  };
  const userId = 1;
  //validation
  const schema = {
    title: { type: "string", optional: false, max: "100" },
    content: { type: "string", optional: false, max: "500" },
    categoryId: { type: "number", optional: false },
  };
  const v =new Validator();
 const validationResponce= v.validate(updatedPost,schema);
 if (validationResponce!==true) {
    return res.status(400).json({
        message:"Validation failed",
        error:validationResponce
    });
    
 }
 // end validation
  models.Post.update(updatedPost, { where: { id: id, userId: userId } })
    .then((result) => {
      res.status(200).json({
        message: "post updated successfully",
        post: updatedPost,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went wrong !",
        error: error,
      });
    });
}

function deletePost(req, res) {
  const id = req.params.id;
  const userId = 1;
  models.Post.destroy({ where: { id: id, userId: userId } })
    .then((result) => {
      res.status(200).json({
        message: "post deleted successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went wrong !",
        error: error,
      });
    });
}
module.exports = {
  save: save,
  show: show,
  index: index,
  update: update,
  deletePost: deletePost,
};
