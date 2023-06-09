// Import the necessary libraries
const express = require('express');
const dotenv = require('dotenv');
const {Configuration, OpenAIApi} = require("openai");
const bodyParser = require('body-parser');
const cors = require("cors");


// Load environment variables from .env file
dotenv.config();

// Create the Express app
const app = express();

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Setup CORs
app.use(cors());

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
app.post('/message', async (req, res) => {

    console.log(process.env.OPENAI_API_KEY);

    try {
        const {prompt} = req.body;

        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "system", "content": "You are a web expert"},
                {"role": "user", "content": prompt},
                
            ]
          })
          /*
          {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
          {"role": "user", "content": "Where was it played?"}
          */

          res.json({
            message : chatCompletion.data.choices[0].message.content,
            role: chatCompletion.data.choices[0].message.role
          });
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
