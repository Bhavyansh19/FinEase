const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const UserEntry = require("./Models/UserEntry");

const app = express();
const port = 4000;
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://bhavyanshbj:bhuvi1234@cluster0.vawce.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// POST Route to Add New Entry
app.post("/add-entry", async (req, res) => {
  try {
    const { name, explain, amount, how, date } = req.body;

    const newEntry = new UserEntry({
      name,
      explain,
      amount,
      how,
      date: date ? new Date(date) : new Date(), // Default to current date if not provided
    });

    await newEntry.save();
    res
      .status(201)
      .json({ message: "Entry added successfully!", data: newEntry });
  } catch (error) {
    res.status(500).json({ message: "Error adding entry", error });
  }
});
// GET Route to Retrieve All Entries
app.get("/expenses", async (req, res) => {
  try {
    const expenses = await UserEntry.find();
    res.status(200).json({ success: true, data: expenses });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching expenses", error });
  }
});

app.listen(port, () => console.log("Server is running on port", port));
