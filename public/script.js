const socket =io('http://localhost:3000');

let username='';

document.getElementById('join-btn').addEventListener('click',
(event)=>{
    event.preventDefault();


username=document.getElementById("username").value;

if(username.trim()!==""){
document.querySelector(".form").style.display='none';
document.querySelector(".chatroom-container").style.display='block';

document.querySelector('.chatroom-header').innerText=`Chatroom - ${username}`;

socket.emit('username enter', username);

}else{
    alert('username cannot be empty');
}
});


document.getElementById('send-btn').addEventListener('click',
(event)=>{
 event.preventDefault();
 const data={
    username:username,
    message:document.getElementById("message-input").value,
 }

 addMessage(data, true);

 socket.emit('message', data);
 document.getElementById("message-input").value="";
})


function addMessage(data, flage){
 var msgDiv=document.createElement("div");
 msgDiv.innerText=`${data.username}: ${data.message}`

 if(flage){
    msgDiv.setAttribute('class','message sent');

 }else{
    msgDiv.setAttribute('class','message recieved');
 }
 document.getElementById("message-conatiner").appendChild(msgDiv);

}
document.getElementById('exit-btn').addEventListener('click',
()=>{
 socket.emit('username left',username );
});

socket.on('username enter', (username)=>{
    var msgDiv=document.createElement("div");
    msgDiv.innerText=`${username} has entered`;

    document.querySelector('#message-conatiner').appendChild(msgDiv);
});

socket.on('message', (data)=>{
    if(data.username !== username){
addMessage(data, false);
    }
})
socket.on('username left', data=>{
    if(data!==username){
        var msgDiv=document.createElement('div');
        msgDiv.innerText=`${data} has left`;
        document.getElementById("message-conatiner").appendChild(msgDiv); 
    }
    
    
});