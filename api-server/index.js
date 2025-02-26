const express = require("express");
const { getMinimumValue, getMaximumValue, getAverage, sort, countOccurrences } = require("./utils");

const app = new express();

const port = 3000;

const greetings = { message: "Hello Nodes Express!" };

app.get("/", (req, res) => {
  res.json(greetings);
});

 

app.get("/numbers/min", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  const result = getMinimumValue(num1, num2);

  //   const label = {min: num1 < num2 ? num1 : num2};
  //   const label = {min: Math.min(num1, num2)};

  res.status(result.status).json(result.data);
});

app.get("/numbers/max", (req, res) => {
  const numbers = req.query.numberlist;
  const result = getMaximumValue(numbers);
  res.status(result.status).json(result.data);
});

// /numbers/avg?numbers=1,2,3,4,5...n
app.get("/numbers/avg", (req, res) => {
  const numbers = req.query.numberlist;
  const result = getAverage(numbers);
  res.status(result.status).json(result.data);
});

// /numbers/sort?numbers=1,2,3,4,5...n&type=asc/desc
app.get("/numbers/sort", (req, res) => {
  const numbers = req.query.numbers;
  const type = req.query.type;
  const result = sort(numbers, type);
  res.status(result.status).json(result.data);
});

// /numbers/count?arr=1,2,AA,4,AA,66...n&search=AA // need to count the number of times the search term appears in the array
app.get("/numbers/count", (req, res) => {
    const values = req.query.values;
    const searchTerm = req.query.search;
    const result = countOccurrences(values, searchTerm)
    res.status(result.status).json(result.data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
