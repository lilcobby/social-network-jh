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
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// update user
  async updateUser(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
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
      res.json(userData);
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
  // add friends
  async addFriend(req, res){
    try{
      const friend = await User.findOneAndUpdate(
        {_id: req.params.userId},
        { $push: {friends: req.params.friendId, username: req.body.username}},
        {new: true}
        )
       
        if (!friend){
          return res.status(404).json({message: "no friend with that Id exists"})
        }
        res.json(friend)
    }
    catch(err){res.status(500).json(err)}
  },
  // delete friend
  async deleteFriend(req, res){
    try{
      const friend = await User.findOneAndUpdate(
        {_id: req.params.userId},
        { $pull: {friends: req.params.friendId}},
        {new: true}
        )
        
        if (!friend){
          return res.status(404).json({message: "no friend with that Id exists"})
        }
        res.json("one friend deleted")
    }
    catch(err){res.status(500).json(err)}
  }

};



