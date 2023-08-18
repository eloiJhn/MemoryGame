const express = require('express');
const path = require('path');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');

const app = express();
const port = 3000;

// create a livereload server
const liveReloadServer = livereload.createServer();

// watch for changes in the network directory
liveReloadServer.watch(path.join(__dirname, '../public'));

// setup live reload middleware
app.use(connectLivereload());

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Define your routes here
// ...

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.render('gameClassique');
});

app.get('/gameClassique', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/gameClassique.html'));
});
