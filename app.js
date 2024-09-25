const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

// express app
const app = express();
const host = 'http://localhost';
const port = 3000;
const dbPassword = 'password_example';

// connect to mongodb
const dbURI = `mongodb+srv://HellCAT:${dbPassword}@nodejs.li2vk.mongodb.net/NodeJS?retryWrites=true&w=majority&appName=NodeJS`;
mongoose
  .connect(dbURI)
  .then(() => app.listen(port))
  .then(() => console.log(`The app has started on ${host}:${port}`))
  .catch((err) => console.log(err));

// register view engine (for dynamic)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// middleware & static files
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes
app.get('/', (_, res) => {
  res.redirect('/blogs');
});

app.get('/about', (_, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((_, res) => {
  res.status(404).render('404', { title: '404' });
});
