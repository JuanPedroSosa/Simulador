var socket = io();


	// Emit ready event.
	socket.emit('ready')
	var messages = document.getElementById('prueba');

	// Listen for the talk event.
	socket.on('inflar', function(data) {
		console.log("estoy inflando: ", data);
		messages.innerHTML = data
	})


