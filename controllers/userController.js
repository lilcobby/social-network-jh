const { User } = require('../models');

module.exports = {
  async getUser(req, res) {
    try {
      const user = await User.find();
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// update user
  async updateUser(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        {
          _id: req.params.userId
        },
        {
          $set: req.body
        },
        {
        runValidators: true, new: true
        }
        );
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({_id: req.params.userId});
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      
      res.json("user deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
