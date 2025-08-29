// index.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// ✅ Replace with your details
const FULL_NAME = "sankalp_sharma";
const DOB = "04032004"; // format ddmmyyyy
const EMAIL = "sankalp.sharma2022@vitstudent.ac.in";
const ROLL_NUMBER = "22BCT0146";

// Helper to check if string is numeric
function isNumeric(str) {
  return /^\d+$/.test(str);
}

// Helper to alternate caps
function alternateCaps(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += i % 2 === 0 ? str[i].toUpperCase() : str[i].toLowerCase();
  }
  return result;
}

// POST /bfhl
app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let allAlphabets = "";

    data.forEach((item) => {
      if (isNumeric(item)) {
        let num = parseInt(item);
        if (num % 2 === 0) {
          even_numbers.push(item); // keep as string
        } else {
          odd_numbers.push(item); // keep as string
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        allAlphabets += item;
      } else {
        special_characters.push(item);
      }
    });

    // Build concat string (reverse + alternating caps)
    let concat_string = alternateCaps(allAlphabets.split("").reverse().join(""));

    return res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (err) {
    return res.status(500).json({
      is_success: false,
      message: "Server Error",
    });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Full Stack Assignment API is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
