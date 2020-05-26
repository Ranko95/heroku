const { Challenge } = require('../models/challenges');
const { User } = require('../models/users')
const { Comment } = require('../models/comments')
const router = require('express').Router();
const parser = require('../middleware/video-upload');
const moment = require('moment');

router.get('/', async (req, res, next) => {
  try {
    const challenges = await Challenge.find({});
    res.send(challenges);
  } catch (error) {
    next(error)
  }
})

router.get('/comments', async (req, res, next) => {
  try {
    const comments = await Comment.find({});
    res.send(comments);
  } catch (error) {
    next(error)
  }
})

router.post('/uploadVideo', parser.single('file'), async (req, res, next) => {
  try {
    const video = {};
    video.url = req.file.url;
    res.send({ videoUrl: video.url });
  } catch (error) {
    next(error);
  }
});

router.post('/createChallenge', async (req, res, next) => {
  try {
    const { userId, videoUrl, title, description, hashtags, original } = req.body;
    const user = await User.findById(userId);
    let hashtag = hashtags.match(/([\w\d]*){3,}/gm);
    hashtag = hashtag.filter(el => el.length >= 3);
    hashtag = hashtag.map(el => { if (el[0] == '#') { return el } else { return '#' + el } });
    const challenge = await Challenge.create({
      title: title,
      description: description,
      hashtags: hashtag,
      url: videoUrl,
      likes: [],
      date: moment(new Date()).format('LL'),
      user: user,
      original: original,
    });
    await User.findByIdAndUpdate(userId, { $push: { challenges: challenge._id } });
    const updatedUser = await User.findById(userId);
    res.send({ challenge, updatedUser });
  } catch (error) {
    next(error);
  }
});

router.put('/:id/like', async (req, res, next) => {
  try {
    const { _id, userId } = req.body;
    let updated;
    const challenge = await Challenge.findOne({ _id });
    if (challenge.likes.includes(userId)) {
      updated = await Challenge.updateOne({ _id }, { $pull: { likes: userId } });
    } else {
      updated = await Challenge.updateOne({ _id }, { $push: { likes: userId } });
    }
    if (updated.nModified > 0) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    next(error);
  }
})

router.post('/newComment', async (req, res, next) => {
  try {
    const { userId, textComment, challengeId } = req.body;
    const user = await User.findById(userId);
    const comment = await Comment.create({
      user: user,
      text: textComment,
      date: moment(new Date()).format('LL'),
      likes: 0,
    });
    const updatedChallenge = await Challenge.updateOne({ _id: challengeId }, { $push: { comments: comment } });
    if (updatedChallenge.nModified > 0) {
      res.send({ comment });
    } else {
      await Comment.deleteOne({ _id: comment._id });
      res.sendStatus(500);
    } 
  } catch (error) {
    next(error);
  }
});

module.exports = router;
