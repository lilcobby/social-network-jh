const { Thought, User } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find().populate("userId");
    
      res.json(thought);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  // Get a single comment
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId }).populate("userId");

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that id' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a comment
  async createThought (req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'thought created, but no users with this ID' });
      }

      res.json({ message: 'thought created' });
    } catch (err) {
      console.error(err);
    }
  },
  // update thought
  async updateThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        {
          _id: req.params.thoughtId
        },
        {
          $set: req.body
        },
        {
        runValidators: true, new: true
        }
        );
      res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({_id: req.params.thoughtId});
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      
      res.json("thought deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },
//  create reactions

async createReaction(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: { reactionBody: req.body.reactionBody, username: req.body.username, userId: req.body.userId } } },
      { new: true, runValidators: true }
    ).populate('reactions');

    if (!thought) {
      return res.status(404).json({ message: 'No thought to react to' });
    }

    res.json({ message: 'Reaction created', thought });
  } catch (err) {
    console.error(err);
  }
},
//  delete reaction

async deleteReaction(req, res) {
 try {
    const reaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { new: true }
    );

    if (!reaction) {
      return res.status(404).json({ message: 'No reaction with this ID!' });
    }

    res.json(`One reaction deleted`);
 } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error with deleting reaction' });
 }
}
};
