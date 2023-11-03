const express_async_handler = require('express-async-handler');
const Post = require('./../schemas/Post');

const create_post = express_async_handler(async (req, res) => {
  // console.log('res->',req.body)
  let newImage = req.files;
  const { title, text, image } = req.body;
  if (!title || !text || !image) {
    return res
      .status(400)
      .send({ success: false, message: 'Please fill all the fields!' });
  }
  try {
    let image = null;
    if (req.files && req.files.image) {
      image = await uploadFile(req.files.image, 'card_images');
    }
    const post = await Post.create({
      title: title,
      text: text,
      user: req.user._id,
    });
    if (post) {
      let data = {
        title: post.title,
        text: post.text,
      };
      res.send({ data: data });
    }
  } catch (error) {}
});

const get_all_post = express_async_handler(async (req, res) => {
  console.log('res->', req.user._id);

  let post = await Post.find({ user: req.user._id });
  console.log(post);
  if (!post) {
    res.send({ Error: 'Error in getting posts' });
    throw new Error('Getting error to get post');
  }
  res.send({ data: post });
});
module.exports = {
  create_post,
  get_all_post,
};
