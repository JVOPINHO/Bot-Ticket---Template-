const express = require("express");
const app = express();
app.get("/", (req, res) => {
	res.send("Olá Mundo")
})
app.listen(process.env.PORT)

require(__dirname + "/src/index.js").run;