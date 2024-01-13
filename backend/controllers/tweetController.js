const Tweet = require('../model/Tweet');

const getAllTweets = async (req, res) => {
  const tweets = await Tweet.find();
  if (!tweets) return res.status(204).json({ 'message': 'No tweets found' });
  res.json(tweets);
}

const createNewTweet = async (req, res) => {
  if (!req?.body?.username || !req?.body?.tweet) {
    return res.status(400).json({ 'message': 'username and tweet are required' })
  }

  try {
    const result = await Tweet.create({
      username: req.body.username,
      tweet: req.body.tweet
    });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { getAllTweets, createNewTweet }