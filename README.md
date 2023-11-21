# GigaChat

https://github.com/PushpRatan/-GigaChat/assets/92618493/34cf76f0-868c-43c9-a2fa-5220e6e9ccab


## Overview

This Node.js application is a simple chatbot that integrates with the OpenAI API for generating responses. The chat history is stored in a MongoDB database. The application uses the Socket.IO library to enable real-time communication between the server and clients.

## Components

### 1. `app.js`

#### Dependencies
- **dotenv**: Loads environment variables from a `.env` file.
- **express**: Web application framework for Node.js.
- **http**: Node.js module for creating HTTP servers.
- **socket.io**: Library for real-time, bidirectional communication between web clients and servers.
- **openai**: Node.js client for the OpenAI API.
- **mongoose**: MongoDB object modeling for Node.js.

#### Configuration
- **.env**: Configuration file for environment variables, including OpenAI API key and MongoDB connection string.

#### Initialization
- **Express App**: Creates an instance of the Express application.
- **HTTP Server**: Creates an HTTP server using the Express app.
- **Socket.IO**: Initializes a Socket.IO instance attached to the HTTP server.

#### MongoDB Connection
- **mongoose**: Connects to a MongoDB database using the provided connection string.

#### WebSocket Handling
- **Socket.IO Connection**: Handles WebSocket connections using Socket.IO.
- **Conversation History**: Initializes and maintains a conversation history for each connected user.
- **sendMessage Event**: Listens for messages sent by users, processes them, and emits responses to clients.
- **disconnect Event**: Handles user disconnections.

#### OpenAI Integration
- **OpenAI API Call**: Sends user messages to the OpenAI API to generate responses.

### 2. `ChatModel.js`

#### Dependencies
- **mongoose**: MongoDB object modeling for Node.js.

#### Schema
- **Chat Schema**: Defines the schema for chat messages, including roles, content, and timestamps.

#### Model
- **ChatModel**: Creates a Mongoose model based on the chat schema.

## Deployment

The application can be deployed on various platforms, such as Heroku, Vercel, or AWS Elastic Beanstalk. The deployment process typically involves setting up environment variables, configuring the database connection, and ensuring the necessary dependencies are installed.

## Usage

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file with OpenAI API key and MongoDB connection string.
4. Run the application using `npm start`.

## License

This project is licensed under the [MIT License](LICENSE).
