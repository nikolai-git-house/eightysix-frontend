const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.resolve(__dirname, 'client/production')))

app.get('*', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendFile(path.resolve(path.resolve(__dirname, 'client/production/index.html')));
});

const PORT = process.env.PORT || 1025;

app.listen(PORT, (error) => {
  if (error) console.error(error);
  console.log(`Deployment envronment at ${process.env.NODE_ENV}`);
  console.log(`Backend API at ${process.env.API_URL}`);
  console.log(`Server is listening at ${PORT} port`);
});
