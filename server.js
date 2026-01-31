const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const contactRoutes=require("./routes/contacts");
app.use(contactRoutes);


// Serve all frontend files
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));

// Default route
app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/membership", (req, res) => {
  res.render("pages/membership");
});

app.get("/training", (req, res) => {
  res.render("pages/training");
});

app.get("/events", (req, res) => {
  res.render("pages/events");
});

app.get("/our-story", (req, res) => {
  res.render("pages/about");
});

app.get("/bod", (req, res) => {
  res.render("pages/BOD");
});

app.get("/committee", (req, res) => {
  res.render("pages/committee");
});

app.get("/bylaws", (req, res) => {
  res.render("pages/bylaws");
});

app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

app.get("/covsphere", (req, res) => {
  res.render("pages/covsphere");
});

app.get("/privacy", (req, res) => {
  res.render("pages/privacy");
});

app.get("/refund", (req, res) => {
  res.render("pages/refund");
});

app.get("/terms", (req, res) => {
  res.render("pages/TandC");
});

app.get("/registration", (req, res) => {
  res.render("pages/reg0");
});

app.get("/personal", (req, res) => {
  res.render("pages/reg1");
});

app.get("/education", (req, res) => {
  res.render("pages/reg2");
});

app.get("/work", (req, res) => {
  res.render("pages/reg3");
});


app.use("/api/contact", contactRoutes);


//nodejs
// app.get("/work", (req, res) => {
//   res.sendFile(path.join(__dirname, "reg3.html"));
// });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
