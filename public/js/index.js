var socket = io();
socket.on('connect',function(){
  console.log("connected");

  socket.emit('createMessage',{
    from: 'Lavan',
    text: 'Yup, that works for me.'
  });
});
socket.on('disconnect',function(){
  console.log("disconnected");
});
socket.on('newEmail',function(email){
  console.log('New email',email);
});
socket.on('newMessage',function(message){
  console.log('newMessage',message);
});
