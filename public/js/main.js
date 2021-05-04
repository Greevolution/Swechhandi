const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//Get username and room from URL
const{ username, room} =Qs.parse(location.search,{
  ignoreQueryPrefix: true
});


const socket=io();

//Join chatroom
socket.emit('joinRoom',{username, room});

//get room and user info
socket.on('roomUsers', ({room, users}) =>{
  outputRoomName(room);
  outputUsers(users);
});

//Message from Server
socket.on('message', message =>{
  console.log(message);
  outputMessage(message);


  //scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// message sublit
chatForm.addEventListener('submit',(e)=>{
  e.preventDefault();

  //Get message text
  const msg = e.target.elements.msg.value;

  // Emit message to server
  socket.emit('chatMessage',msg);

  //Clear input
  e.target.elements.msg.value= '';
  e.target.elements.msg.focus();
});


//output message to document
function outputMessage(message){
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML=`<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}

//add room name to document
function outputRoomName(room){
  roomName.innerText = room;
}

//add users to document
function outputUsers(users){
  userList. innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`;
}