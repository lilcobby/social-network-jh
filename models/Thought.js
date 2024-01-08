const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// Schema to create reaction
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: ()=> new Types.ObjectId()
    }, 
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
  
  // linking user id to thoughts
  userId:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtValue) => moment(createdAtValue).format("MMM DD, YYYY")
    },
    
     
  },   
  {
    toJSON: {
        getters: true
    } }

)

// Schema to create thought model
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtValue)=> moment(createdAtValue).format("MMM DD, YYYY")

    },
    username: {
      type: String,
      required: true,

    },
    // linking user id to thoughts
    userId:{
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    reactions: [ReactionSchema]
 
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);




// Initialize our Thought model
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
