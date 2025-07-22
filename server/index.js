const connectToMongo=require("./utils/db.js");
const express = require('express')
const userRoutes=require('./routes/auth');
const notesRoutes=require('./routes/notes.js');
const cors=require("cors");
require('dotenv').config();
connectToMongo();
const app = express();
const port = process.env.Port;
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/auth',userRoutes);
app.use('/api/notes',notesRoutes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
