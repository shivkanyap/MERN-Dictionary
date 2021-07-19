const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { mongoose } = require('./config/database');
const { routes } = require('./config/routes');
const path = require('path');

app.use(express.json());
app.use(cors());
app.use('/', routes);

// app.use(express.static(path.join(__dirname, 'client/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });
app.listen(port, () => {
  console.log('lisiting on port', port);
});
