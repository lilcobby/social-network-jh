const { Schema, model } = require('mongoose');

// Schema for what makes up a user
const UserSchema = new Schema({
  
  username: { 
    type: String,
    required: true,
    unique: true,
    
  },

  email: {
    type: String, 
    required: true, 
    unique: true, 
    
    },

  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: "Thoughts"
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
},
{toJSON:{
  virtuals: true,
  getters: true
},
id: false
}
);

// Initialize the User model
const User = model('User', UserSchema);

module.exports = User;
