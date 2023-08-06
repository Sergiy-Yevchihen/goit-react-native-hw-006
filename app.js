// mongodb+srv://mango:sE3zUneHs2HIqjjA@cluster0.2lbcc4j.mongodb.net/
//    mango
// mongodb+srv://mango:sE3zUneHs2HIqjjA@cluster0.2lbcc4j.mongodb.net/contacts_user?retryWrites=true&w=majority
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
