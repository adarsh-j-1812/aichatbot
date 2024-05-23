const socketIO = require("socket.io");
const express = require("express");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
// const prompt1 = require('prompt-sync')();





// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('AIzaSyAN9gQK74UeoyzSAP9k44jNYaawgYi1ucQ');
// const enterprompt = prompt1('Enter the prompt: ')

const app = express();
const server = http.createServer(app);
const io = socketIO(server)





io.on('connection' , async (socket)=>{
  try{
    console.log('connected');
    socket.on('giveanswer', (tex)=>{
      async function run() {
        // For text-only input, use the gemini-pro model
        console.log(tex.text,tex.id);
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
      
        const prompt = tex.text
      
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // console.log(text);
        io.emit('answer', {answe: text, id: tex.id})
        // return text
      }
      run();
    })
  }
  catch(err){
    console.log(err);
  }
})


app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

// Express routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Server listening
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});





