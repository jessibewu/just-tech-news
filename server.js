const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
// require 'path' for static folder below
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// set up Handlebars.js as your app's template engine of choice:
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// - end -

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Static assets folder
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});