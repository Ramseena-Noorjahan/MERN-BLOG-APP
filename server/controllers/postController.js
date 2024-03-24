const Post = require("../models/postModel");
const User = require("../models/userModel");
const path = require("path");
const fs = require("fs");
const HttpError = require("../models/errorModels");
const { v4: uuid } = require("uuid");

//=======================================Create A post
//api  : api/posts
//PROTECTED
const createPost = async (req, res, next) => {
  try {
    let { title, category, description } = req.body;
    if (!title || !category || !description || !req.files) {
      return next(
        new HttpError("Fill in all fields.And choose thumbnails.", 422)
      );
    }
    const { thumbnail } = req.files;

    //check the file size
    if (thumbnail > 2000000) {
      return next(
        new HttpError("Thumbnail too big.File should be less than 2mb")
      );
    }

    let fileName = thumbnail.name;
    let splittedFilename = fileName.split(".");
    let newFilename =
      splittedFilename[0] +
      uuid() +
      "." +
      splittedFilename[splittedFilename.length - 1];
    thumbnail.mv(
      path.join(__dirname, "..", "/uploads", newFilename),
      async (err) => {
        if (err) {
          return next(new HttpError(err));
        } else {
          const newPost = await Post.create({
            title,
            category,
            description,
            thumbnail: newFilename,
            creator: req.user.id,
          });
          // console.log(newPost);
          if (!newPost) {
            return next(new HttpError("post couldn't be created.", 422));
          }

          //find user and increate post count by 1
          const currentuser = await User.findById(req.user.id);
          console.log(currentuser)
          const userPostCount = currentuser.posts + 1;
          await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
          res.status(201).json(newPost);
        }
      }
    );
  } catch (error) {
    return next(new HttpError(error));
  }
};

//=======================================Get All Posts
//get  : api/posts
//PROTECTED
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ updatedAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
};

//=======================================Get Single Posts
//get  : api/posts/:id
//PROTECTED
const getPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return next(new HttpError("Post not found.", 404));
    }
    res.status(200).json(post);
  } catch (error) {
    return next(new HttpError(error));
  }
};

//=======================================Get Posts By Category
//get  : api/posts/categiries/:category
//UNPROTECTED
const getCatPosts = async (req, res, next) => {
  try {
    const { category } = req.params;
    const catPosts = await Post.find({ category }).sort({ createdAt: -1 });
    res.status(200).json(catPosts);
  } catch (error) {
    console.log(error);
    return next(new HttpError(error));
  }
};

//=======================================GET AUTHOR/USERS POSTS
//api  : api/posts/users/:id
//UNPROTECTED
const getUerPosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ creator: id }).sort({ createdAt: -1 });
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return next(new HttpError(error));
  }
};

//=======================================EDIT POSTS
//patch  : api/posts/:id
//PROTECTED
const editPost = async (req, res, next) => {
  try {
    let fileName;
    let newFilename;
    let updatedPost;
    const postId = req.params.id;
    let { title, category, description } = req.body;

    if (!title || !category || !description) {
      return next(new HttpError("Fill in All Fields.", 422));
    }
    if (!req.files) {
      updatedPost = await Post.findByIdAndUpdate(
        postId,
        { title, category, description },
        { new: true }
      );
    } else {
      //get old from database
      const oldPost = await Post.findById(postId);
      //delete old thumbnail from upload
      fs.unlink(
        path.join(__dirname, "..", "uploads", oldPost.thumbnail),
        async (err) => {
          if (err) {
            return next(new HttpError(err));
          }
        }
      );
      //upload new thumbnail
      const { thumbnail } = req.files;
      //check the file size
      if (thumbnail.size > 2000000) {
        return next(new HttpError("Thumbnail too big.Should be less than 2mb"));
      }
      fileName = thumbnail.name;
      let splittedFilename = fileName.split(".");
      newFilename =
        splittedFilename[0] +
        uuid() +
        "." +
        splittedFilename[splittedFilename.length - 1];
      thumbnail.mv(
        path.join(__dirname, "..", "uploads", newFilename),
        async (err) => {
          if (err) {
            return next(new HttpError(err));
          }
        }
      );
      updatedPost = await Post.findByIdAndUpdate(
        postId,
        { title, category, description, thumbnail: newFilename },
        { new: true }
      );
    }
    if (!updatedPost) {
      return next(new HttpError("Couldn't should be post.", 400));
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    return next(new HttpError(error));
  }
};

//=======================================DELETE POSTS
//delete  : api/posts/:id
//PROTECTED
const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return next(new HttpError("Post Unavailable.", 400));
    }
    const post = await Post.findById(postId);
    const fileName = post?.thumbnail;

    //Delete Thumbnail form uploads folder
    fs.unlink(path.join(__dirname, "..", "uploads", fileName), async (err) => {
      if (err) {
        return next(new HttpError(err));
      } else {
        await Post.findByIdAndDelete(postId);

        //find user and reduce post count by 1
        const currentuser = await User.findById(req.user.id);
        const userPostCount = currentuser?.posts - 1;
        await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
      }
    });
    res.status(200).json(`Post ${postId} deleted succesfully`);
  } catch (error) {
    console.log(error);
    return next(new HttpError(error));
  }
};

module.exports = {
  createPost,
  getPost,
  getPosts,
  getUerPosts,
  getCatPosts,
  editPost,
  deletePost,
};
