const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db'); 

const adminRoutes = require('./routes/admin');
const rendererRoutes = require('./routes/renderer');


const app = express();
const PORT = process.env.PORT || 3000;


// Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/admin', adminRoutes);
app.use('/renderer', rendererRoutes);

// Server
app.listen(PORT, () => {
  console.log(`NFAMultiTool server is running on http://localhost:${PORT}`);
});