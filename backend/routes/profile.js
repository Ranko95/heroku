const express = require("express");
const parser = require('../middleware/img-upload');

const router = express.Router();
const { User } = require('../models/users');
const { Challenge } = require('../models/challenges');

router.post('/uploadImg', parser.single('file'), async (req, res, next) => {
  try {
    const image = {};
    image.url = req.file.url;
    image.id = req.file.public_id;
    res.send({ imageUrl: image.url });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id, imageUrl } = req.body;
    await User.findByIdAndUpdate(id, { $set: { avatar: imageUrl } });
    const user = await User.findById(id);
    res.send({ user });
  } catch (error) {
    next(error);
  }
});

router.put('/:id/subscribe', async (req, res, next) => {
  try {
    const { _id, followingId, challengeId } = req.body;
    let userUpdated;
    let followerUpdated;
    let challengeUpdated;
    let newUser;
    const user = await User.findOne({ _id });

    if (user.following.includes(followingId)) {
      userUpdated = await User.updateOne({ _id }, { $pull: { following: followingId } });
      followerUpdated = await User.updateOne({ _id: followingId }, { $pull: { followers: _id } });
      challengeUpdated = await Challenge.updateOne({ _id: challengeId }, { user: { $pull: { followers: _id } } } );
      newUser = await User.findOne({ _id: followingId });
      challengeUpdated = await Challenge.updateOne({ _id: challengeId }, { $set: { 'user': newUser } } );
    } else {
      userUpdated = await User.updateOne({ _id }, { $push: { following: followingId } });
      followerUpdated = await User.updateOne({ _id: followingId }, { $push: { followers: _id } });
      newUser = await User.findOne({ _id: followingId });
      challengeUpdated = await Challenge.updateOne({ _id: challengeId }, { $set: { user: newUser } } );
    }
    if (userUpdated.nModified > 0 && followerUpdated.nModified > 0 && challengeUpdated.nModified > 0) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/populateFollowings', async (req, res, next) => {
  try {
    const { _id } = req.user;
    const populated = await User.findOne({ _id }).populate('following');
    res.send(populated.following);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
