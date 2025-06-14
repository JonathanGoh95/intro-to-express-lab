// Import Express
const express = require("express");
const app = express();

// Create an Express app
app.use(express.json());

const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.get("/greetings/:username", (req, res) => {
  res.send(`<h1>Hello there, ${req.params.username}!</h1>`);
});

app.get("/roll/:dice", (req, res) => {
  const num = Number(req.params.dice);
  const rand = Math.floor(Math.random() * num);
  if (isNaN(num)) {
    res.send(`<h1>You must specify a number.</h1>`);
  } else {
    res.send(`<h1>You rolled a ${rand}.</h1>`);
  }
});

app.get("/collectibles/:index", (req, res) => {
  const index = Number(req.params.index);
  if (index > collectibles.length - 1) {
    res.send(`<h1>This item is not yet in stock. Check back soon!</h1>`);
  } else {
    res.send(
      `<h1>So, you want the ${collectibles[index].name}? For $${collectibles[index].price}, it can be yours!</h1>`
    );
  }
});

app.get("/shoes/", (req, res) => {
  const minPrice = Number(req.query.minPrice) || "";
  const maxPrice = Number(req.query.maxPrice) || "";
  const type = req.query.type || "";
  if (isNaN(minPrice) || isNaN(maxPrice)) {
    res.send(`<h1>Please enter a valid number for the price</h1>`);
  } else if (minPrice && maxPrice) {
    res.send(
      `<ul>${shoes
        .filter((shoe) => shoe.price >= minPrice && shoe.price <= maxPrice)
        .map(
          (shoe) =>
            `<li><b>Name</b>: ${shoe.name}, <b>Price</b>: $${shoe.price}, <b>Type</b>: ${shoe.type}</li>`
        )
        .join("")}</ul>`
    );
  } else if (minPrice) {
    res.send(
      `<ul>${shoes
        .filter((shoe) => shoe.price >= minPrice)
        .map(
          (shoe) =>
            `<li><b>Name</b>: ${shoe.name}, <b>Price</b>: $${shoe.price}, <b>Type</b>: ${shoe.type}</li>`
        )
        .join("")}</ul>`
    );
  } else if (maxPrice) {
    res.send(
      `<ul>${shoes
        .filter((shoe) => shoe.price <= maxPrice)
        .map(
          (shoe) =>
            `<li><b>Name</b>: ${shoe.name}, <b>Price</b>: $${shoe.price}, <b>Type</b>: ${shoe.type}</li>`
        )
        .join("")}</ul>`
    );
  } else if (type) {
    res.send(
      `<ul>${shoes
        .filter((shoe) => shoe.type === type)
        .map(
          (shoe) =>
            `<li><b>Name</b>: ${shoe.name}, <b>Price</b>: $${shoe.price}, <b>Type</b>: ${shoe.type}</li>`
        )
        .join("")}</ul>`
    );
  } else {
    res.send(
      `<ul>${shoes
        .map(
          (shoe) =>
            `<li><b>Name</b>: ${shoe.name}, <b>Price</b>: $${shoe.price}, <b>Type</b>: ${shoe.type}</li>`
        )
        .join("")}</ul>`
    );
  }
});

// Listen for requests on port 3000
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
