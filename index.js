const express = require("express");
const ejs = require("ejs");
const PORT = 3000;
const app = express();

app.use(express.static("views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.sendFile("./FrontEnd/home.html");
});
app.listen(PORT, () => console.log("Server started on port 3000"));
