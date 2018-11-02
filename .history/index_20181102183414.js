const app = require("express")();
var path = require("path");

//view engine setup
app.set("views", path.join(__dirname, "views")); //setting views directory for views.
app.set("view engine", "hbs"); //setting view engine as handlebars

app.get("/", (req, res) => {
	res.render("index", { people: getRandomList });
});
let getRandomList = () => {
	let list = ["ada", "turing", "lovelace", "neumann", "gracehopper"];
	let limit = Math.floor(Math.random() * (list.length - 1 - 0) + 0); //generating random number between 0 & 4
	return list.slice(limit);
};
app.listen(5000);
