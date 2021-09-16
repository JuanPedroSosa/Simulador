const express = require('express');
const app = express();
const router = express.Router();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");

const port = process.env.PORT || 5000;
const DIST_DIR = __dirname;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(DIST_DIR));
// settings
app.set('port', port);
       // set our port
//view engine setup
app.set("views", path.join(__dirname, "views")); //setting views directory for views.
//app.set("view engine", "hbs"); //setting view engine as handlebars

app.get("/", (req, res) => {
	arr = [new Date(), "Disponible"];
	//res.render("index", { msg: arr }); //passing list of people to our index.hbs file.
	res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get("/status", (req, res) => {
	arr = [new Date(), "Estado OK"];
	res.render("index", { msg: arr }); //passing list of people to our index.hbs file.
});


app.post("/", (req, res) => {
	console.log("body:", req.body.msg);
	arr = [new Date(), req.body.msg];
	let msg = `${new Date()}: ${req.body.msg}`;
	console.log("arr:", arr);
	io.emit("inflar", msg);
	//res.sendFile(path.join(__dirname + '/views/edit1.html'));
	res.status(200).json({ msg: msg }); //passing list of people to our index.hbs file.

});

let getRandomList = () => {
	let list = ["ada", "turing", "lovelace", "neumann", "gracehopper"];
	let limit = Math.floor(Math.random() * (list.length - 1 - 0) + 0); //generating random number between 0 & 4
	return list.slice(limit);
};

app.use("/", router);

io.on('connection', (socket) => {
		console.log('a user connected');
});
// starting the server
server.listen(app.get('port'), () => {
	// Conectase a la base de datos
  console.log(`Server on port ${app.get('port')}`);
});

