// let todocon = document.getElementById("todocon");
// let todotext = document.getElementById("todotext");
// let socket = io.connect();

// document.addEventListener("keypress", (e) => {
//   if (e.key === "Enter" && todotext.value !== "") {
//     send();
//   }
// });
// // document.addEventListener
// function send() {
//   if (todotext.value !== "") {
//     let todo = document.createElement("div");
//     todo.classList.add("todo");
//     let you = document.createElement("h4");
//     you.classList.add("you");
//     you.innerHTML = "You:";
//     let todosend = document.createElement("div");
//     todosend.classList.add("sended");
//     todosend.innerHTML = todotext.value;
//     let AI = document.createElement("h4");
//     AI.classList.add("AI");
//     AI.innerHTML = "AI:";
//     let answer = document.createElement("div");
//     answer.classList.add("answer");

//     let uniqueId = "answer_" + Date.now();
//     answer.id = uniqueId;
//     let answerid = answer.id;

//     answer.innerHTML =  "hello and welcome to the integration of the best ai tool known as the gemini ai and this site is made with the integration of the gemini ai";
//     socket.emit("giveanswer", todotext.value);
//     socket.on("answer", (answe) => {
//       console.log("got", answe);
//       console.log(answerid);
//       document.getElementById(answerid).innerHTML = answe;
//     });
    
//     todo.appendChild(you);
//     todo.appendChild(todosend);
//     todo.appendChild(AI);
//     todo.appendChild(answer);
//     todocon.appendChild(todo);
//     todotext.value = "";
//   }
// }


let todocon = document.getElementById("todocon");
let todotext = document.getElementById("todotext");
let socket = io.connect();

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && todotext.value !== "") {
    send();
  }
});

function send() {
  if (todotext.value !== "") {
    let todo = document.createElement("div");
    todo.classList.add("todo");
    
    let you = document.createElement("h4");
    you.classList.add("you");
    you.innerHTML = "You:";
    
    let todosend = document.createElement("div");
    todosend.classList.add("sended");
    todosend.innerHTML = todotext.value;
    
    let AI = document.createElement("h4");
    AI.classList.add("AI");
    AI.innerHTML = "AI:";
    
    let answer = document.createElement("div");
    answer.classList.add("answer");

    // Generate a unique ID
    let uniqueId = "answer_" + Date.now();
    answer.id = uniqueId;

    // Placeholder content for the answer
    answer.innerHTML = "Awaiting AI response...";
    
    // Emit the message with the unique ID
    socket.emit("giveanswer", { text: todotext.value, id: uniqueId });

    // Append elements to the todo container
    todo.appendChild(you);
    todo.appendChild(todosend);
    todo.appendChild(AI);
    todo.appendChild(answer);
    todocon.appendChild(todo);

    // Clear the input field
    todotext.value = "";
  }
}

// Set up the socket listener once
socket.on("answer", (data) => {
  // console.log("got", data.answe);
  // console.log(data.id);
  let answerElement = document.getElementById(data.id);
  if (answerElement) {
    answerElement.innerHTML = `<pre>${data.answe}</pre>`;
  }
});

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(() => {
    let gemini = document.getElementById('gemini')
    gemini.style.scale = 1.8
    gemini.style.opacity = 1
    setTimeout(()=>{
      gemini.style.opacity = 0
    },3300) 
  }, 500);
})
