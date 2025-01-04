const path = require("node:path");

const express = require("express");
const app = express();
const hbs = require("hbs");
const { geocode } = require("./utils/geocode");
const { forecast } = require("./utils/forecast");
console.log(path.join(__dirname, "../public"));
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "/templates/views");
const partialsPath = path.join(__dirname, "/templates/partials");
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));
const port = 3000;
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Andrew",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help hbs fuck",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error: error.message });
    }
    forecast(data, (error, forecastData) => {
      if (error) return res.send({ error: error.message });

      console.log(forecastData);
      res.send({
        forecast: forecastData.current,
        location: forecastData.location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);
  res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
