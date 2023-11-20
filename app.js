const mongoose = require("mongoose");
const ChatModel = require("./ChatModel");
require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const { OpenAI, OpenAIApi } = require("openai");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;

// OpenAI API configuration
const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

app.use(express.static("public"));

app.get('/getChatHistory', async (req, res) => {
  try {
    const chatHistory = await ChatModel.find().sort({ timestamp: 1 });
    res.json(chatHistory);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


io.on("connection", (socket) => {
  console.log("New user connected");

  // Initialize the conversation history
  const conversationHistory = [];

  socket.on("sendMessage", async (message, callback) => {
    try {
      // Add the user message to the conversation history
      const userMessage = { role: "user", content: message };
      conversationHistory.push(userMessage);

      //Save the user message to MongoDb
      const userMessageModel = new ChatModel(userMessage);
      await userMessageModel.save();

      console.log(message);
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: message }],
        model: "gpt-3.5-turbo",
      });

      const response = completion.choices[0].message.content;

      // Add the assistant's response to the conversation history
      const botMessage = { role: "assistant", content: response };
      conversationHistory.push(botMessage);

      const botMessageModel = new ChatModel(botMessage);
      console.log(botMessageModel);
      await botMessageModel.save();

      socket.emit("message", response);
      callback();
    } catch (error) {
      console.error(error);
      callback("Error: Unable to connect to the chatbot");
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
