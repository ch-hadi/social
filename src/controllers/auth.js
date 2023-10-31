const express_async_handler = require('express-async-handler');
const User = require('./../schemas/User');
const genrateToken = require('./../utils/Token');
// const bcrypt = require('bcryptjs')
const bcrypt = require('bcrypt');

const sign_up = express_async_handler(async (req, res) => {
  const full_name = req.body.full_name;
  const email = req.body.email;
  const password = req.body.password;
  const gender = req.body.gender;
  const city = req.body.city;
  const tell = req.body.tell;
  if ((!full_name || !email || !password || !gender, !city)) {
    console.log('error');
    res
      .status(200)
      .send({ success: false, message: 'All fields are Required..' });
    throw new Error('All fields are Required..');
  }

  const userFound = await User.findOne({ email: email });

  if (userFound) {
    return res
      .status(400)
      .send({
        success: false,
        message: 'User already exist witht this email!',
      });
  }
  const securedPassword = bcrypt.hashSync(password, 10);
  // User.index({ "loc": "2dsphere" });
  const user = await User.create({
    name: full_name,
    email: email,
    password: securedPassword,
    gender: gender,
    tell: tell ? tell : null,
    city: city,
  });

  if (user) {
    let data = {
      _id: user._id,
      name: user.name,
      email: user.email,
      // gender: user.gender,
      // tell: user.tell,
      // city: user.city,
      token: genrateToken(user._id),
    };

    return res.status(200).send({ success: true, data: data });
  }
});
const sign_in = express_async_handler(async (req, res) => {
  // res.send('Sign')
  // const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(400)
      .send({ success: false, message: 'All fields are require...' });

    // throw new Error('All fields are require...');
  }

  const user = await User.findOne({ email: email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).send({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: genrateToken(user._id),
      },
    });
  } else {
    return res.status(400).send({ success: false, message: 'User not found!' });
    // throw new Error('User not Found..');
  }
});

const allUser = express_async_handler(async (req, res) => {
  // const keyword = req.query.search
  //   ? {
  //       $or: [
  //         { name: { $regex: req.query.search, $options: "i" } },
  //         { email: { $regex: req.query.search, $options: "i" } },
  //       ],
  //     }
  //   : {};

  const users = await User.find();
  res.status(200).send({ success: true, data: users });
});

module.exports = {
  sign_in,
  sign_up,
  allUser,
};
