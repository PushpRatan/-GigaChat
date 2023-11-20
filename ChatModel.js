const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    role:{
        type: String,
        enum:['user','assistant'],
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    timestamp:{
        type: Date,
        default: Date.now
    },
});

const ChatModel = mongoose.model('chat',chatSchema);

module.exports = ChatModel;