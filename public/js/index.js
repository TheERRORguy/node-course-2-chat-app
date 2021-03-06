var socket = io();
socket.on('connect',function(){
  console.log("connected");
});
socket.on('disconnect',function(){
  console.log("disconnected");
});
socket.on('newMessage',function(message){
  var template = $('#message-template').html();
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var html = Mustache.render(template,{
    text : message.text,
    from: message.from,
    createdAt: formattedTime
  });
  $('#messages').append(html);
});

socket.on('newLocationMessage',function(message){
  var template = $('#location-message-template').html();
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var html = Mustache.render(template,{
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });
    $('#messages').append(html);
});

var messageTextbox = $('[name=message]');

$('#message-form').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{
    from: 'User',
    text: messageTextbox.val()
  },function(){
    messageTextbox.val('');
  });
});

var locationButton = $('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
      return alert('Geolocation not supported by your browser.');
    }
    locationButton.attr('disabled','disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position){
      locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage',{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
    },function(){
      locationButton.removeAttr('disabled').text('Send Location');
      alert('Unable to fetch location.');
    });
});
