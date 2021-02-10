const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();

// use static files for views:
app.use(express.static(path.join(__dirname, "vue")));

// connect our database:
mongoose.connect("mongodb://localhost/mcdonald", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to DataBase !!!"));

app.use(express.json());

app.use(cors());
// use routes
const categoriesroute = require("./routes/categories.js");
app.use("/categories", categoriesroute);

const subcategoriesroute = require("./routes/subcategories.js");
app.use("/subcategories", subcategoriesroute);

const produitsroute = require("./routes/produits.js");
app.use("/produits", produitsroute);

const ingredientroute = require("./routes/ingredients.js");
app.use("/ingredients", ingredientroute);

const tableroute = require("./routes/tables.js");
app.use("/tables", tableroute);

const commandroute = require("./routes/commands.js");
app.use("/commands", commandroute);

const cardroute = require("./routes/cards.js");
app.use("/cards", cardroute);

const promoroute = require("./routes/promos.js");
app.use("/promos", promoroute);



// start the server
app.listen(3000, () => console.log("the server is started"));
