// Import the necessary libraries
const express = require('express');
const dotenv = require('dotenv');
const {Configuration, OpenAIApi} = require("openai");


// Load environment variables from .env file
dotenv.config();

// Create the Express app
const app = express();

// Configure OpenAI API
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

// Create an index route which returns a welcome message
app.get('/', (req, res) => {
  res.send('Welcome to our A.I Backend!');
});

// Create a "message" route which returns a JSON response
app.get('/message', async (req, res) => {

    console.log(process.env.OPENAI_API_KEY);

    try {
        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: "When was the first version of Node.js released"
                }
            ]
          })

          res.json(chatCompletion.data.choices[0].message);
    } catch (error) {
        console.log(JSON.stringify(error));
    }

  



  
});

// The port the app will listen on
const PORT = process.env.PORT || 1330;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
