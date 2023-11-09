const express = require('express');

const api = require('./routes/api'); 

const app = express(); 
const { PORT = 8000 } = process.env;

app.use(express.json()); 
app.use(
  express.urlencoded({
    extended: true,
  })
); 

app.use('/api/cars', api.cars());
app.use('/api/sizes', api.sizes());

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:%d', PORT);
});
