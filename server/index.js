const connectToMongo=require("./utils/db.js");
const express = require('express')
connectToMongo();
const app = express();
const port = process.env.port;
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/auth',require('./routes/auth'));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
