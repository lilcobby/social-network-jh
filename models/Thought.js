const { Schema, model } = require('mongoose');
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
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtValue) => moment(createdAtValue).format("MMM DD, YYYY")
    }
  }
)

// Schema to create thought model
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      midlength: 1,
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
    reations: [ReactionSchema]
 
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

// Create a virtual property `ReactionCount` that gets the amount of reactions
// ThoughtSchema.virtual("reactionCount").get(function(){return this.reactions.length})

// Initialize our Post model
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
